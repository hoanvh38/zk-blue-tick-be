export interface IUser {
    id: string
    address: string
    role: string
    email?: string
    permission?: string[]
    isBlocked: boolean
    blockNote: string
    createdAt: Date
    updatedAt: Date
}
