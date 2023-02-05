import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReturnedUserInfoDto {
  @ApiProperty({ example: 12354, required: true })
  @IsNotEmpty()
  id: number;
  @ApiProperty({ example: 'Mohamed Nabil', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'mohamed28', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: 'mohamed@gmail.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'photo.jpg', required: true })
  @IsString()
  @IsOptional()
  photo: string;
}
