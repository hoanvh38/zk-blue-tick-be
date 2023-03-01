import * as path from 'path'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { ThrottlerModule } from '@nestjs/throttler'
import { AppController } from 'app.controller'
import { I18nModule } from 'nestjs-i18n'

import { AuthModule } from 'apis/auth/auth.module'
import { StorageModule } from 'apis/storage/storage.module'
import { UserModule } from 'apis/user/user.module'
import { AwsS3Module } from 'frameworks/aws-s3-service/aws-s3.module'
import { RedisCacheModule } from 'frameworks/cache-service/cache.module'
import { MongoModule } from 'frameworks/mongo/mongo.module'

@Module({
    imports: [
        MongoModule,
        ScheduleModule.forRoot(),
        AuthModule,
        TerminusModule,
        RedisCacheModule,
        UserModule,
        StorageModule,
        AwsS3Module,
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/i18n/'),
                watch: true,
            },
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
