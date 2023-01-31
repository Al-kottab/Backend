import { Injectable } from '@nestjs/common';
import { AnnouncementDto } from './dto/announcements.dto';
import { CreateGroupDto } from './dto/create-group.dto';
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
  createAnnouncement(groupId: string, announcementDto: AnnouncementDto) {
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
    return `This action returns all group`;
  }

  findOne(id: number) {
    return { id: 'group_id', name: 'group_name' };
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
