import { IImage } from 'interfaces/image.interface'

// eslint-disable-next-line
export interface ImageEntity extends IImage {}

export class ImageEntity {
    constructor(partial: Partial<IImage>) {
        if (partial) {
            this.height = partial.height
            this.width = partial.width
            this.url = partial.url
            this.type = partial.type
        }
    }
}
