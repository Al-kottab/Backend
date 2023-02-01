import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { returnedUserDto } from '../dummy-data/dummy-user';
import { ReturnedUserDto } from './returned-user.dto';

export class ReturnedUserAndTokenDto {
  @ApiProperty({ example: 'success', required: true })
  @IsString()
  @IsNotEmpty()
  status: string;
  @ApiProperty({ example: 'e54544e5', required: true })
  @IsString()
  @IsNotEmpty()
  token: string;
  @ApiProperty({ example: returnedUserDto, required: true })
  @IsString()
  @IsNotEmpty()
  user: ReturnedUserDto;
}
