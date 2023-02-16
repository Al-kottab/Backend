import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateAnnouncementDto {
  @ApiProperty({ example: 'announcement text', required: true })
  @IsString()
  @IsNotEmpty()
  text: string;
}
