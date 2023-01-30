import { ApiProperty } from '@nestjs/swagger';

export class AnnouncementDto {
  @ApiProperty({ description: 'announcement text' })
  @IsStr
  text: string;
}
