import { User } from 'apis/user/models/user.schema'
import { IUser } from 'interfaces/user.interface'

// eslint-disable-next-line
export interface UserEntity extends IUser {}

export class UserEntity {
    constructor(partial: Partial<User>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.address = partial.address
            this.role = partial.role
            this.isBlocked = partial.isBlocked
            this.backImageUrl = partial.backImageUrl
            this.frontImageUrl = partial.frontImageUrl
            this.requestStatus = partial.requestStatus
            this.requireImageUrl = partial.requireImageUrl
            this.supportImageProofUrl = partial.supportImageProofUrl
            this.idNumber = partial.idNumber
            this.uniqueId = partial.uniqueId
            this.createdAt = partial.createdAt
            this.updatedAt = partial.updatedAt
        }
    }
}
