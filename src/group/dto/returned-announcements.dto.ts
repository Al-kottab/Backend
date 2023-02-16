import { ApiProperty } from '@nestjs/swagger';
import { dummyGroupAnnouncement } from '../dummy-data/dummy-group-announcement';
import { AnnouncementDto } from './announcement.dto';

export class ReturnedAnnouncementsDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: [dummyGroupAnnouncement] })
  announcements: [AnnouncementDto];
}
