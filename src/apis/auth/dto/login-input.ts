import { IsNotEmpty, IsString } from 'class-validator'

export class StaffLoginDto {
    @IsNotEmpty()
    @IsString()
    email: string
}

export class VerifyStaffLoginDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    sign: string
}

export class LoginInputDto {
    @IsNotEmpty()
    @IsString()
    address: string
}

export class VerifyLoginInputDto {
    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    sign: string

    @IsNotEmpty()
    @IsString()
    time: string
}
