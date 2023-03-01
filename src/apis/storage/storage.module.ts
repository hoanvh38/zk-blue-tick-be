import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { StorageController } from './storage.controller'
import { StorageService } from './storage.service'

@Global()
@Module({
    imports: [JwtModule.register({})],
    providers: [StorageService],
    controllers: [StorageController],
    exports: [StorageService],
})
export class StorageModule {}
