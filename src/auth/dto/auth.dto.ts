import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'moaz@gmail.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
