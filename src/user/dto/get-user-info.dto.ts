import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUserInfoDto {
  @ApiProperty({ example: 15498, required: true })
  @IsString()
  userid: number;
}
