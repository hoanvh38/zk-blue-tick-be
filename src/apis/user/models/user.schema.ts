import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ROLE } from 'shared/constants'

@Schema()
export class User extends Document {
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    address: string

    @Prop({
        type: String,
        unique: true,
        sparse: true,
    })
    email: string

    @Prop({
        type: String,
        default: ROLE.USER,
    })
    role: string

    @Prop({
        type: Boolean,
        default: false,
    })
    isBlocked: boolean

    @Prop({
        type: String,
        default: '',
    })
    blockNote: string

    @Prop({
        type: Date,
    })
    createdAt: Date

    @Prop({
        type: Date,
    })
    updatedAt: Date
}

export const UserSchema = new Mongo.Schema(
    DefinitionsFactory.createForClass(User),
    {
        timestamps: true,
    }
)
