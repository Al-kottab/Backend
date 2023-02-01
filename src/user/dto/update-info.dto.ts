import { ApiProperty } from "@nestjs/swagger";
import { IsCreditCard, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class updateInfoDto { 
    @ApiProperty({ example: 'mohamed25', required: false })
    @IsString()
    @IsOptional()
    username: String;
    @ApiProperty({ example: '+201149656383', required: false })
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber: String;
    @ApiProperty({ example: '1234 5784 2123 2154', required: false })
    @IsCreditCard()
    @IsOptional()
    creditCard: String;
    @ApiProperty({ example: 'photo.jpg', required: false })
    @IsString()
    @IsOptional()
    photo: String;
}