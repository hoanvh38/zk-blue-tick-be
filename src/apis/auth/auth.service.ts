import * as Web3 from 'web3'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { BadRequestException, Global, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { UserEntity } from 'apis/user/entities/user.entity'
import { User } from 'apis/user/models/user.schema'
import { CacheService } from 'frameworks/cache-service/cache.service'
import { BASE_VALUE, COLLECTION, ERROR } from 'shared/constants'
import GenerateCode from 'shared/helpers/generate-code'

import { LoginInputDto, VerifyLoginInputDto } from './dto'
import { ILoginResponse } from './entities/login-response.entity'

@Global()
@Injectable()
export class AuthService {
    private web3

    constructor(
        private readonly redis: CacheService,
        private readonly jwtService: JwtService,
        @InjectModel(COLLECTION.USER) private readonly UserModel: Model<User>
    ) {
        this.web3 = new (Web3 as any)()
    }

    async login(doc: LoginInputDto): Promise<string> {
        doc.address = doc.address
            ? this.web3.utils.toChecksumAddress(doc.address)
            : null
        const verifyCode = await GenerateCode.create({
            length: 4,
            charset: '0123456789',
        })

        const oldToken = await this.redis.get(doc.address),
            promises = []
        if (oldToken) {
            promises.push(this.logout(oldToken)) //disable old session
        }

        await Promise.all([
            this.redis.set(
                COLLECTION.VERIFY_LOGIN + doc.address,
                {
                    address: doc.address,
                    verifyCode,
                },
                BASE_VALUE.TTL_ACCESS_TOKEN_REDIS
            ),
            ...promises,
        ])
        return verifyCode
    }

    async verifyLogin(doc: VerifyLoginInputDto): Promise<ILoginResponse> {
        doc.address = this.web3.utils.toChecksumAddress(doc.address)
        let loginInfo: any = {}

        const [confirmInfoString, _userInfo]: [
            { address: string; verifyCode: string },
            User
        ] = await Promise.all([
            this.redis.get(COLLECTION.VERIFY_LOGIN + doc.address),
            this.UserModel.findOne({ address: doc.address }),
        ])
        if (!confirmInfoString) {
            throw new BadRequestException(ERROR.CONFIRM_CODE_NOT_VALID)
        }
        let userInfo = {}
        try {
            userInfo = new UserEntity(
                _userInfo
                    ? _userInfo
                    : await new this.UserModel({
                          address: doc.address,
                      }).save()
            )
        } catch (error) {}

        const { verifyCode } = confirmInfoString

        await this.verifySign({
            signature: doc.sign,
            address: doc.address,
            verifyCode,
            time: doc.time,
        })
        const token = this.jwtService.sign(
            {
                address: doc.address,
                time: new Date().getTime(),
                key: GenerateCode.create({
                    length: 6,
                    charset: '123456789',
                }),
            },
            { expiresIn: '2 days' }
        )

        loginInfo = {
            user: userInfo,
        }

        await Promise.all([
            this.redis.set(token, userInfo, BASE_VALUE.TTL_TOKEN_REDIS),
            this.redis.set(doc.address, token, BASE_VALUE.TTL_TOKEN_REDIS),
            this.redis.del(COLLECTION.VERIFY_LOGIN + doc.address),
        ])

        return { ...loginInfo, access_token: token }
    }

    async verifySign(option: {
        signature: string
        address: string
        verifyCode: string
        time: string
    }): Promise<boolean> {
        const { signature, address, verifyCode, time } = option
        let recoveredAddress = recoverPersonalSignature({
            data: `I want to login on Saloon at ${time}. I accept the Saloon Terms of Service https://docs.saloon.io/policies/terms-of-service. Login code: ${verifyCode}`,
            signature: signature,
        })
        recoveredAddress = this.web3.utils.toChecksumAddress(recoveredAddress)
        if (recoveredAddress !== address) {
            throw new BadRequestException(ERROR.ACCESS_DENIED)
        }
        return true
    }

    async logout(token: string) {
        const user = await this.redis.get(token)

        await Promise.all([
            this.redis.del(token),
            user
                ? user.address
                    ? this.redis.del(user.address)
                    : user.email
                    ? this.redis.del(user.email)
                    : null
                : null,
        ])
    }
}
