export class CacheCollectionEntity {
    collectionAddress: string
    imageUrl: string
    name: string
    opensea: string

    constructor(partial: Partial<CacheCollectionEntity>) {
        if (partial) {
            this.collectionAddress = partial.collectionAddress
            this.imageUrl = partial.imageUrl
            this.name = partial.name
            this.opensea = partial.opensea
        }
    }
}
