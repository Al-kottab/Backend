import { IsEmail, IsNumber, IsString } from "class-validator"

export class TokenDataDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsNumber()
    // TODO: will be id
    sub: number;

    // TODO: change type class to enum type
    type: string;
}