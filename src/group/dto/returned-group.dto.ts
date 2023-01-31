import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReturnedGroupDto {
  @ApiProperty({ description: 'id of the group' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'group name' })
  @IsString()
  name: string;
}
