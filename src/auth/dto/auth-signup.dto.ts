import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthSignupDto {
  @ApiProperty({ example: 'moaz@gmail.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ example: 'معاذ محمد', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'MoazHassan2022', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: '+201060534698', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  @ApiProperty({ example: '4000545640209447', required: false })
  @IsString()
  @IsOptional()
  creditCard?: string;
  @ApiProperty({ example: 'student', required: false })
  @IsString()
  @IsNotEmpty()
  type: string;
}
