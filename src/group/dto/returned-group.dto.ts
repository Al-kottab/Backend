import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReturnedGroupDto {
  @ApiProperty({ description: 'id of the group', example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'group name', example: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'created at' })
  createdAt: Date;

  @ApiProperty({ description: 'group logo path', example: '/path/to/logo' })
  logo: string;
}
