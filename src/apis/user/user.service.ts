import * as Web3 from 'web3'
import {
    BadRequestException,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CacheService } from 'frameworks/cache-service/cache.service'
import { COLLECTION, ERROR } from 'shared/constants'

import { AdminUpdateUserDto, UserUpdateDto } from './dto/update-user'
import { UserEntity } from './entities/user.entity'
import { User } from './models/user.schema'

@Injectable()
export class UserService {
    private web3

    constructor(
        @InjectModel(COLLECTION.USER) private readonly UserModel: Model<User>,
        private readonly redis: CacheService
    ) {
        this.web3 = new (Web3 as any)()
    }

    async getOne(
        query: { _id?: string; address?: string },
        option?: { isAdmin?: boolean }
    ): Promise<UserEntity> {
        const { isAdmin } = option || {}
        if (query.address) {
            query.address = this.web3.utils.toChecksumAddress(query.address)
        }
        const user: User = await this.UserModel.findOne(query)

        if (!user) {
            throw new NotFoundException(ERROR.NOT_FOUND)
        }

        if (!isAdmin && user.isBlocked) {
            throw new BadRequestException(ERROR.USER_BLOCKED)
        }
        const permission: string[] = await this.redis.get(
            `permission-${user.role}`
        )
        const userEntity = new UserEntity(user)
        userEntity.permission = permission || []
        return userEntity
    }

    async updateOne(id: string, doc: UserUpdateDto): Promise<User> {
        const user: User = await this.UserModel.findByIdAndUpdate(id, doc, {
            new: true,
        })
        if (!user) {
            throw new NotAcceptableException()
        }

        return user
    }

    async adminUpdateUser(id: string, doc: AdminUpdateUserDto): Promise<User> {
        const user: User = await this.UserModel.findByIdAndUpdate(id, doc, {
            new: true,
        })
        if (!user) {
            throw new NotAcceptableException()
        }

        return user
    }
}
