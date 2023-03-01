import { BadRequestException } from '@nestjs/common'

export default class Validator {
    static validateEmail(email: string): string {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(email.toLowerCase())) {
            throw new BadRequestException()
        }
        return email.toLowerCase()
    }
}
