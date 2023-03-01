import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common'

import { MemberLimitGuard } from 'plugins/guards/member-login-limit.guard'

import { AuthService } from './auth.service'
import { LoginInputDto, VerifyLoginInputDto } from './dto'
import {
    IMemberLogin,
    LoginVerifyResponseEntity,
} from './entities/login-response.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @UseGuards(MemberLimitGuard)
    // @Throttle(5, 500)
    async login(@Body() doc: LoginInputDto): Promise<IMemberLogin> {
        const verifyCode = await this.authService.login(doc)
        return { verifyCode }
    }

    @Post('/verify-login')
    @UseGuards(MemberLimitGuard)
    // @Throttle(5, 300)
    async verifyLogin(
        @Body() doc: VerifyLoginInputDto
    ): Promise<LoginVerifyResponseEntity> {
        const result = await this.authService.verifyLogin(doc)
        return new LoginVerifyResponseEntity(result)
    }

    @Post('/logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Request() ctx) {
        await this.authService.logout(ctx.headers.authorization)
    }
}
