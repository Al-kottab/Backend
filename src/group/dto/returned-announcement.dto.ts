import { ApiProperty } from '@nestjs/swagger';
import { AnnouncementDto } from './announcement.dto';

export class ReturnedAnnouncementDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ description: 'announcement' })
  announcement: AnnouncementDto;
}
