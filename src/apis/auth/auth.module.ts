import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { jwtCredentials } from 'configs'

import { UserSchema } from 'apis/user/models/user.schema'
import { COLLECTION } from 'shared/constants'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION.USER, schema: UserSchema },
        ]),
        JwtModule.register({
            secret: jwtCredentials.privateKey,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
