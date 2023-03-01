import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DB } from 'configs'

import { FileSchema } from 'apis/storage/model/file.schema'
import { UserSchema } from 'apis/user/models/user.schema'
import { COLLECTION } from 'shared/constants'

@Global()
@Module({
    imports: [
        MongooseModule.forRoot(DB.DB_URL, DB.OPTION),
        MongooseModule.forFeature([
            { name: COLLECTION.USER, schema: UserSchema },
            { name: COLLECTION.FILE, schema: FileSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class MongoModule {}
