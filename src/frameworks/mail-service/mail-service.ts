import * as SGMail from '@sendgrid/mail'
import { ServiceUnavailableException } from '@nestjs/common'
import { env, mailKey } from 'configs'

SGMail.setApiKey(mailKey)

export default class MailService {
    static async sendStaffEmail(
        verifyCode: string,
        email: string,
        role: string
    ) {
        try {
            let html = `<div>`
            html += `<p>Hello ${role},</p>`
            html += `<h4>Password login code is:</h4>`
            html += `<h3>${verifyCode}</h3>`
            html += `<p>Please do not share this password with anyone.</p>`
            html += `<div>Best regards,`
            html += `<br />Saloon Developer Team</br>`
            html += `</div>`

            const msg = {
                to: [email],
                from: {
                    email: 'no-reply@saloon.io',
                    name: 'SaloonProject',
                },
                subject: `[${env}] SaloonProject`,
                html: html,
            }
            await SGMail.send(msg)
        } catch (e) {
            console.log('sendStaffEmail', e)
            throw new ServiceUnavailableException(e)
        }
    }
}
