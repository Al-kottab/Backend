import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcements.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { ReturnedGroupDto } from './dto/returned-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  removeBadgeFromStudent(groupId: string, studentId: string) {
    return { status: 'success' };
  }
  giveBadgeToStudent(groupId: string, studentId: string) {
    return { status: 'success' };
  }
  deleteStudent(groupId: string, studentId: string) {
    return { status: 'success' };
  }
  acceptStudent(groupId: string, studentId: string) {
    return { status: 'success' };
  }
  leaveGroup(groupId: string) {
    return { status: 'success' };
  }
  askToJoinAGroup(groupId: string) {
    return { status: 'success' };
  }
  markStudentAsHafez(groupId: string, studentId: string) {
    return { status: 'success' };
  }
  getUnhafezStudents(groupId: string) {
    return [];
  }
  getGroupStudents(groupId: string) {
    return [];
  }
  createAnnouncement(groupId: string, announcementDto: CreateAnnouncementDto) {
    return { status: 'success' };
  }
  getAnnouncements(groupId: string) {
    return [];
  }
  uploadLogo(groupId: string, file: Express.Multer.File) {
    return { path: '/path/to/file' };
  }
  getMyGroups(userId: string) {
    return [];
  }
  create(createGroupDto: CreateGroupDto) {
    return { id: 'group_id' };
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    const dto: ReturnedGroupDto = {
      createdAt: new Date(),
      id: 'id',
      logo: '/path/to/logo',
      name: 'group name',
    };
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return { status: 'success' };
  }

  remove(id: number) {
    return { status: 'success' };
  }
}
