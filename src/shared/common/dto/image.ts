import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

import { FILE_TYPE } from 'shared/constants'

export class ImageDto {
    @IsNotEmpty()
    @IsNumber()
    width: number

    @IsNotEmpty()
    @IsNumber()
    height: number

    @IsNotEmpty()
    @IsString()
    url: string

    @IsOptional()
    @IsEnum(FILE_TYPE)
    type: FILE_TYPE
}
