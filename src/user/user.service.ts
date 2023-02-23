import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ReturnedUserInfoDto } from './dto/returned-user-info.dto';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { ReturnedStudentScheduleDto } from './dto/returned-student-schedule.dto';
import { ReturnedTeacherScheduleDto } from './dto/returned-teacher-schedule.dto';
import { returnedUserDto } from './dummy-data/dummy-user';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  async validateIfTeacher(id: number, email: string): Promise<void | never> {
    const user = await this.prisma.user.findUnique({
      where: {
        email, id
      },
      include: {
        teacher: true
      }
    })
    if (user?.teacher?.id !== id) {
      throw new UnauthorizedException('يجب أن تكون شيخًا لتقوم بهذا');
    }
  }
  constructor(private prisma: PrismaService) { }

  updateInfo(updateInfoDto: UpdateInfoDto) {
    return returnedUserDto;
  }

  getUser(getUserInfoDto: GetUserInfoDto) {
    return ReturnedUserInfoDto;
  }

  getProfile(getUserInfoDto: GetUserInfoDto) {
    return returnedUserDto;
  }

  getStudentSchedule(getUserInfoDto: GetUserInfoDto) {
    return [ReturnedStudentScheduleDto];
  }

  getTeacherSchedule(getUserInfoDto: GetUserInfoDto) {
    return [ReturnedTeacherScheduleDto];
  }
}
