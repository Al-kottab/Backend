import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetForgottenPasswordDto {
  @ApiProperty({ example: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ example: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}
