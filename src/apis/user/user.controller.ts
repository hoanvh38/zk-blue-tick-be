import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common'

import { AuthGuard } from 'plugins/guards'
import { RequestInfoType } from 'shared/common/types'

import { UserUpdateDto } from './dto/update-user'
import { UserEntity } from './entities/user.entity'
import { User } from './models/user.schema'
import { UserService } from './user.service'

@Controller()
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    async getUser(@Request() ctx: RequestInfoType): Promise<UserEntity> {
        return this.userService.getOne({ _id: ctx.user.id })
    }

    @Put('/me')
    async updateMyAccount(
        @Request() ctx: RequestInfoType,
        @Body() doc: UserUpdateDto
    ): Promise<UserEntity> {
        const user: User = await this.userService.updateOne(ctx.user.id, doc)
        return new UserEntity(user)
    }

    @Get('/users/:id')
    async getOne(@Param('id') id: string): Promise<UserEntity> {
        const user: UserEntity = await this.userService.getOne({ _id: id })
        return new UserEntity(user)
    }

    @Get('/users/address/:address')
    async getOneByAddress(
        @Param('address') address: string
    ): Promise<UserEntity> {
        const user: UserEntity = await this.userService.getOne({ address })
        return new UserEntity(user)
    }
}
