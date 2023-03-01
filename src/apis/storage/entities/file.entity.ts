import { File } from 'apis/storage/model/file.schema'
import { IFile } from 'shared/common/interfaces'

// eslint-disable-next-line
export interface FileEntity extends IFile {}

export class FileEntity {
    constructor(partial: Partial<File>) {
        if (partial) {
            this.url = partial.url
            this.width = partial.width
            this.height = partial.height
            this.uploadById = partial.uploadById
            this.type = partial.type
        }
    }
}
