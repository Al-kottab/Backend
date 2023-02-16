import { AnnouncementDto } from '../dto/announcement.dto';

export const dummyGroupAnnouncement: AnnouncementDto = {
  id: 2,
  text: 'نص إعلان',
  teacherId: 1,
  createdAt: new Date(Date.now()),
};
