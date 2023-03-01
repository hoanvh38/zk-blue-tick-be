import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n'

import { ERROR } from 'shared/constants'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.

        const { httpAdapter } = this.httpAdapterHost
        const ctx = host.switchToHttp()

        if (process.env.NODE_ENV !== 'production') {
            console.error(exception)
        }

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR
        const excResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : { message: ERROR.INTERNAL_SERVER_ERROR }
        const i18n = getI18nContextFromArgumentsHost(host)
        let message
        if (i18n.service) {
            message =
                typeof excResponse['message'] === 'string'
                    ? i18n.t(excResponse['message'])
                    : excResponse['message'] || 'something_was_wrong'
        } else {
            message = exception['message']
        }

        const responseBody = {
            statusCode: httpStatus,
            message: typeof message === 'string' ? [message] : message,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        }
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
    }
}
