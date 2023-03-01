import { Type } from 'class-transformer'
import {
    IsBoolean,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { ImageDto } from 'shared/common/dto'
import { LANGUAGE } from 'shared/constants'

export class AdminUpdateUserDto {
    @IsOptional()
    @IsBoolean()
    readonly isBlocked: boolean

    @IsOptional()
    @IsBoolean()
    readonly isTradeBlocked: boolean

    @IsOptional()
    @IsString()
    readonly blockNote: string
}

export class UserUpdateDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ImageDto)
    readonly avatar?: ImageDto

    @IsOptional()
    @IsString()
    readonly displayName?: string

    @IsOptional()
    @IsEnum(LANGUAGE)
    readonly language?: LANGUAGE
}
