import { Type } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    readonly limit = 10

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    readonly offset = 0
}
