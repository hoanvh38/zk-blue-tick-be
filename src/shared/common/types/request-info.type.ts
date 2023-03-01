import { IsOptional, ValidateNested } from 'class-validator'

import { User } from 'apis/user/models/user.schema'

class Header {
    @ValidateNested()
    @IsOptional()
    authorization?: string
}

export class RequestInfoType {
    @ValidateNested()
    @IsOptional()
    user: User

    @ValidateNested()
    @IsOptional()
    headers?: Header
}
