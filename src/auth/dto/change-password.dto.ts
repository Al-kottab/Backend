import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResetForgottenPasswordDto } from './reset-forgotten-password.dto';

export class ChangePasswordDto extends ResetForgottenPasswordDto {
  @ApiProperty({ example: 'oldPassword', required: true })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
