import { FILE_TYPE } from 'shared/constants'

export interface IImage {
    width: number
    height: number
    url: string
    type: FILE_TYPE
}
