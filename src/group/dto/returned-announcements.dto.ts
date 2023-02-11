import { ApiProperty } from '@nestjs/swagger';
import { AnnouncementDto } from './announcement.dto';

export class ReturnedAnnouncementsDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ description: 'announcement text' })
  announcements: [AnnouncementDto];
}
