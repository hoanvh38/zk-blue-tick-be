import { REQUEST_STATUS } from '../shared/constants'

export interface IUser {
    id: string
    address: string
    role: string
    uniqueId: string
    requestStatus: REQUEST_STATUS
    idNumber: string
    frontImageUrl: string
    backImageUrl: string
    supportImageProofUrl: string
    requireImageUrl: string
    isBlocked: boolean
    createdAt: Date
    updatedAt: Date
    permission?: string[]
}
