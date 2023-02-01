import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUserInfoDto {
  @ApiProperty({ description: '1546e2', required: true })
  @IsString()
  userid: string;
}
