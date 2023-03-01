import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Store } from 'cache-manager'

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Store) {}

    async get(key: string): Promise<any> {
        return await this.cache.get(key)
    }

    async getKeys(key: string): Promise<any> {
        // @ts-ignore
        return await this.cache.store.keys(key)
    }

    async mget(keys: string[]): Promise<any> {
        // @ts-ignore
        return await this.cache.store.mget(...keys)
    }

    async set(key: string, value: any, ttl = 0) {
        // @ts-ignore
        await this.cache.set(key, value, { ttl })
    }

    async del(key: string) {
        await this.cache.del(key)
    }
}
