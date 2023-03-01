import { NotFoundException } from '@nestjs/common'

import { ERROR } from 'shared/constants'

export default class ValidateData {
    static validateDataNotFound(data: any) {
        if (!data) {
            throw new NotFoundException(ERROR.NOT_FOUND)
        }
    }
}
