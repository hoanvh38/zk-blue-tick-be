import * as dotEnv from 'dotenv'

dotEnv.config()

export const MailConfig = {
    apiKey: process.env.SENDGRID_API_KEY,
}
