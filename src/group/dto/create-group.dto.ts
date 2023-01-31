import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ description: 'name of the group' })
  @IsString()
  name: string;
}
