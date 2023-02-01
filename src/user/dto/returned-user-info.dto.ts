import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ReturnedUserInfoDto {
  @ApiProperty({ example: '123e7', required: true })
  @IsString()
  @IsOptional()
  id: string;
  @ApiProperty({ example: 'Mohamed Nabil', required: true })
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({ example: 'mohamed28', required: true })
  @IsString()
  @IsOptional()
  username: string;
  @ApiProperty({ example: 'mohamed@gmail.com', required: true })
  @IsEmail()
  @IsOptional()
  email: string;
  @ApiProperty({ example: 'photo.jpg', required: true })
  @IsString()
  @IsOptional()
  photo: string;
}
