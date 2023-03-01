import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { FILE_TYPE } from 'shared/constants'

@Schema()
export class File extends Document {
    @Prop({
        type: String,
        required: true,
    })
    url: string

    @Prop({
        type: String,
        required: true,
    })
    key: string

    @Prop({
        type: String,
    })
    uploadById?: string

    @Prop({
        type: Number,
    })
    width: number

    @Prop({
        type: Number,
    })
    height: number

    @Prop({
        type: Number,
    })
    size: number

    @Prop({
        type: String,
        enum: Object.values(FILE_TYPE),
        default: FILE_TYPE.IMAGE,
    })
    type: FILE_TYPE

    @Prop({
        type: Date,
    })
    lastRequest?: Date

    @Prop({
        type: Date,
    })
    createdAt?: Date
}

export const FileSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(File),
    {
        timestamps: true,
    }
)
