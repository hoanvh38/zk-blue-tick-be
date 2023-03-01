import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserAdminController } from './user.admin.controller'
import { UserController } from './user.controller'
import { UserPublicController } from './user.public.controller'
import { UserService } from './user.service'

@Module({
    imports: [JwtModule.register({}), HttpModule],
    providers: [UserService],
    controllers: [UserController, UserAdminController, UserPublicController],
    exports: [UserService],
})
export class UserModule {}
