import { ApiProperty } from '@nestjs/swagger';

export class getUserInfoDto {
  @ApiProperty({ description: '1546e2', required: true })
  @IsString()
  userid: string;
}
