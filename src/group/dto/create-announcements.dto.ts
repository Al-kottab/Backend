import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateAnnouncementDto {
  @ApiProperty({ description: 'announcement text' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
