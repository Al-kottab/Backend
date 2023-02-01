import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateLogoDto {
  @ApiProperty({ description: 'path to the photo inside the server' })
  @IsString()
  path: string;
}
