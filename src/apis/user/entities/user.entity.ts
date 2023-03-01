import { User } from 'apis/user/models/user.schema'
import { IUser } from 'interfaces/user.interface'

// eslint-disable-next-line
export interface UserEntity extends IUser {}

export class UserEntity {
    constructor(partial: Partial<User>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.address = partial.address
            this.isBlocked = partial.isBlocked
            this.blockNote = partial.blockNote
            this.role = partial.role
            this.email = partial.email
            this.createdAt = partial.createdAt
            this.updatedAt = partial.updatedAt
        }
    }
}
