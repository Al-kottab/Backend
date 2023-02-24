import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ description: 'name of the group' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
