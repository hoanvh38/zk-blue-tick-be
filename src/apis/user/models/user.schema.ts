import * as Mongo from 'mongoose'
import { DefinitionsFactory, Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { REQUEST_STATUS, ROLE } from 'shared/constants'

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
        default: ROLE.USER,
    })
    role: string

    @Prop({
        type: String,
    })
    uniqueId: string

    @Prop({
        type: Boolean,
        default: false,
    })
    isBlocked: boolean

    @Prop({
        type: String,
        default: REQUEST_STATUS.WAITING,
    })
    requestStatus: REQUEST_STATUS

    @Prop({
        type: String,
    })
    idNumber: string

    @Prop({
        type: String,
    })
    frontImageUrl: string

    @Prop({
        type: String,
    })
    backImageUrl: string

    @Prop({
        type: String,
    })
    supportImageProofUrl: string

    @Prop({
        type: String,
    })
    requireImageUrl: string

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
