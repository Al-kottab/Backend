import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class AnnouncementDto {
  @ApiProperty({ description: 'announcement text' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
