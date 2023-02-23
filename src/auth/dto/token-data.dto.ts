import { IsEmail, IsNumber, IsString } from "class-validator"

export class TokenDataDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsNumber()
    id: number;

    // TODO: change type class to enum type
    type: string;
}