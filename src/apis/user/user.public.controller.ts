import { Controller, Get, Param } from '@nestjs/common'

import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('public/users')
export class UserPublicController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    async getOne(@Param('id') id: string): Promise<UserEntity> {
        const result = await this.userService.getOne({ _id: id })
        return new UserEntity(result)
    }

    @Get('/address/:address')
    async getOneByAddress(
        @Param('address') address: string
    ): Promise<UserEntity> {
        const result = await this.userService.getOne({ address })
        return new UserEntity(result)
    }
}
