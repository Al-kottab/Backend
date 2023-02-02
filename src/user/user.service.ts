import { Injectable } from '@nestjs/common';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ReturnedUserInfoDto } from './dto/returned-user-info.dto';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { ReturnedStudentScheduleDto } from './dto/returned-student-schedule.dto';
import { ReturnedTeacherScheduleDto } from './dto/returned-teacher-schedule.dto';
import { returnedUserDto } from './dummy-data/dummy-user';

@Injectable()
export class UserService {
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
