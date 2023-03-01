import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common'

import { AuthGuard, Roles } from 'plugins/guards'
import { ROLE } from 'shared/constants'

import { AdminUpdateUserDto } from './dto/update-user'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('/admin/users')
@UseGuards(AuthGuard)
export class UserAdminController {
    constructor(private readonly userService: UserService) {}

    @Get('/detail/:id')
    async getOne(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.getOne({ _id: id })
    }

    @Put('/:id')
    @Roles(ROLE.ADMIN)
    async updateOne(
        @Param('id') id: string,
        @Body() doc: AdminUpdateUserDto
    ): Promise<UserEntity> {
        const result = await this.userService.adminUpdateUser(id, doc)
        return new UserEntity(result)
    }
}
