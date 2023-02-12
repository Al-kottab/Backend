import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Group, GroupAnnouncement, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcements.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { ReturnedGroupDto } from './dto/returned-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

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
  async createAnnouncement(
    groupId: number,
    teacherId: number,
    announcementDto: CreateAnnouncementDto,
  ): Promise<{ status: string; announcement: GroupAnnouncement }> {
    if (!groupId || !teacherId)
      throw new BadRequestException('!يوجد خطأ في رقم المحفظ أو رقم الحلقة');
    const group: Group = await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
    if (!group) throw new NotFoundException('!لا وجود لهذه الحلقة');
    if (group.teacherId !== teacherId) {
      throw new UnauthorizedException('!يجب أن تكون المحفظ لهذه الحلقة');
    }
    const announcement: GroupAnnouncement =
      await this.prisma.groupAnnouncement.create({
        data: {
          teacherId,
          groupId,
          ...announcementDto,
        },
      });
    return {
      status: 'success',
      announcement,
    };
  }
  async getAnnouncements(
    groupId: number,
    userId: number,
  ): Promise<{ status: string; announcements: GroupAnnouncement[] }> {
    if (!groupId || !userId)
      throw new BadRequestException('!يوجد خطأ في رقم المستخدم أو رقم الحلقة');
    // check whether he is a teacher of this group or a student in it
    const group: Group = await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
    if (!group) throw new NotFoundException('!لا وجود لهذه الحلقة');
    const isStudent: number = await this.prisma.groupStudent.count({
      where: {
        groupId,
        studentId: userId,
      },
    });
    if (group.teacherId !== userId && isStudent < 1) {
      throw new UnauthorizedException('!يجب أن تكون منضم لهذه الحلقة');
    }
    const announcements: GroupAnnouncement[] =
      await this.prisma.groupAnnouncement.findMany({
        where: {
          groupId,
        },
      });
    return {
      status: 'success',
      announcements,
    };
  }
  async deleteAnnouncement(
    groupId: number,
    teacherId: number,
    announcementId: number,
  ): Promise<{ status: string; message: string }> {
    if (!groupId || !teacherId)
      throw new BadRequestException('!يوجد خطأ في رقم المحفظ أو رقم الحلقة');
    const group: Group = await this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
    if (!group) throw new NotFoundException('!لا وجود لهذه الحلقة');
    if (group.teacherId !== teacherId) {
      throw new UnauthorizedException('!يجب أن تكون المحفظ لهذه الحلقة');
    }
    try {
      await this.prisma.groupAnnouncement.delete({
        where: {
          id: announcementId,
        },
      });
    } catch (err) {
      console.error(err);
      throw new NotFoundException('!لا وجود لهذا الإعلان');
    }
    return {
      status: 'success',
      message: '.تم حذف الإعلان بنجاح',
    };
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
    return dto;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return { status: 'success' };
  }

  remove(id: number) {
    return { status: 'success' };
  }
}
