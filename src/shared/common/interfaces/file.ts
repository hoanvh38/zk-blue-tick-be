import { FILE_TYPE } from 'shared/constants'

export class IFile {
    id: string
    key: string
    width: number
    height: number
    size: number
    url: string
    type: FILE_TYPE
    uploadById: string
    lastRequest: Date
    createdAt: Date
}
