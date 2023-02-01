import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { returnedUserSignupDto } from '../dummy-data/dummy-user-signup';
import { ReturnedUserSignupDto } from './returned-user-signup.dto';

export class ReturnedUserAndTokenSignupDto {
  @ApiProperty({ example: 'success', required: true })
  @IsString()
  @IsNotEmpty()
  status: string;
  @ApiProperty({ example: 'e54544e5', required: true })
  @IsString()
  @IsNotEmpty()
  token: string;
  @ApiProperty({ example: returnedUserSignupDto, required: true })
  @IsString()
  @IsNotEmpty()
  user: ReturnedUserSignupDto;
}
