import {
    ExecutionContext,
    ForbiddenException,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

import { ERROR } from 'shared/constants'

export class LimitGuard extends ThrottlerGuard {
    async handleRequest(
        context: ExecutionContext,
        limit: number,
        ttl: number
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        if (!request.headers.authorization) {
            throw new ForbiddenException(ERROR.INVALID_TOKEN)
        }

        const authorization = request.headers.authorization
        const key = this.generateKey(context, authorization)
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
