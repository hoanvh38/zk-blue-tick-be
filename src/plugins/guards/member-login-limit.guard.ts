import {
    BadRequestException,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

import { ERROR } from 'shared/constants'

export class MemberLimitGuard extends ThrottlerGuard {
    async handleRequest(
        context: ExecutionContext,
        limit: number,
        ttl: number
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        if (!request.body.address) {
            throw new BadRequestException(ERROR.BODY_WAS_WRONG)
        }

        const address = request.body.address
        const key = this.generateKey(context, address)
        const cacheTimesDuringTtl = await this.storageService.getRecord(key)

        if (cacheTimesDuringTtl.length >= limit) {
            throw new HttpException(
                { message: ERROR.LIMIT_RATE },
                HttpStatus.TOO_MANY_REQUESTS
            )
        }
        await this.storageService.addRecord(key, ttl)
        return true
    }
}
