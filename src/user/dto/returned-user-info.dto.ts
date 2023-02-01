import { ApiProperty } from "@nestjs/swagger";
import { IsCreditCard, IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class ReturnedUserInfoDto { 
    @ApiProperty({ example: '123e7', required: true })
    @IsString()
    @IsOptional()
    id: String;
    @ApiProperty({ example: 'Mohamed Nabil', required: true })
    @IsString()
    @IsOptional()
    name: String;
    @ApiProperty({ example: 'mohamed28', required: true })
    @IsString()
    @IsOptional()
    username: String;
    @ApiProperty({ example: 'mohamed@gmail.com', required: true })
    @IsEmail()
    @IsOptional()
    email: String;
    @ApiProperty({ example: 'photo.jpg', required: true })
    @IsString()
    @IsOptional()
    photo: String;
    
}