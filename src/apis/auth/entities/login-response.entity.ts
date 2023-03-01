import { IUser } from 'interfaces/user.interface'

export interface ILoginResponse {
    user: IUser
    access_token: string
}
// eslint-disable-next-line
export interface LoginVerifyResponseEntity extends ILoginResponse {}

export class LoginVerifyResponseEntity {
    constructor(partial: Partial<ILoginResponse>) {
        if (partial) {
            this.user = partial.user
            this.access_token = partial.access_token
        }
    }
}

export interface IMemberLogin {
    verifyCode: string
}
