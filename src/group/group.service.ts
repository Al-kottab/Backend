import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Group, GroupAnnouncement, Prisma } from '@prisma/client';
import { ApiFeaturesDto } from 'src/utils/api-features/dto/api-features.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ApiFeaturesService } from '../utils/api-features/api-features.service';
import { CreateAnnouncementDto } from './dto/create-announcements.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { ReturnedGroupDto } from './dto/returned-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

/**
 * service for group module
 */
@Injectable()
export class GroupService {
  /**
   * class constructor
   * @param prisma prisma service
   * @param apiFeatures  API features service
   */
  constructor(
    private prisma: PrismaService,
    private apiFeatures: ApiFeaturesService,
  ) { }

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
  /**
   * creates an announcement
   * @param groupId the group's id
   * @param teacherId the teacher's id
   * @param announcementDto encapsulates announcement creation data
   * @returns the created announcement
   */
  async createAnnouncement(
    groupId: number,
    teacherId: number,
    announcementDto: CreateAnnouncementDto,
  ): Promise<{ status: string; announcement: GroupAnnouncement }> {
    if (!teacherId)
      throw new UnauthorizedException('!يجب أن تكون المحفظ لهذه الحلقة');
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
  /**
   * get a certain group announcements
   * @param groupId the group's id
   * @param userId the user's id
   * @param take a number determines the wanted amount of announcements
   * @param page a number determines the wanted page of announcements (starts from 1, 2, ....)
   * @returns the group's announcements
   */
  async getAnnouncements(
    groupId: number,
    userId: number,
    take: number, // for pagination
    page: number, // for pagination
  ): Promise<{ status: string; announcements: GroupAnnouncement[] }> {
    if (!userId)
      throw new UnauthorizedException('!يجب أن تكون منضم لهذه الحلقة');
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
    const filter: ApiFeaturesDto = {
      where: {
        groupId,
      },
      orderBy: [
        {
          createdAt: 'desc', // asc for ascendingly
        },
      ],
      take, // take is a limit
      page,
    };
    const announcements: GroupAnnouncement[] =
      await this.apiFeatures.getPaginationList('groupAnnouncement', filter);
    return {
      status: 'success',
      announcements,
    };
  }
  /**
   * delete a certain group announcement by id
   * @param groupId the group's id
   * @param teacherId the teacher's id
   * @param announcementId the announcement's id
   * @returns status and a message for success or fail
   */
  async deleteAnnouncement(
    groupId: number,
    teacherId: number,
    announcementId: number,
  ): Promise<{ status: string; message: string }> {
    if (!teacherId)
      throw new UnauthorizedException('!يجب أن تكون المحفظ لهذه الحلقة');
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
