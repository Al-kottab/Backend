import { Injectable } from "@nestjs/common";
import { returnedUserDto } from "src/auth/dummy-data/dummy-user";
import { updateInfoDto } from "./dto/update-info.dto";
import { ReturnedUserInfoDto } from "./dto/returned-user-info.dto";
import { getUserInfoDto } from "./dto/get-user-info.dto";
import { ReturnedStudentScheduleDto } from "./dto/returned-student-schedule.dto";
import { ReturnedTeacherScheduleDto } from "./dto/returned-teacher-schedule.dto";

@Injectable()
export class UserService {
    updateInfo(updateInfoDto: updateInfoDto) {
        return returnedUserDto;
    }

    getUser(getUserInfoDto:getUserInfoDto) {
        return ReturnedUserInfoDto;
    }

    getProfile(getUserInfoDto:getUserInfoDto) { 
        return returnedUserDto;
    }
    
    getStudentSchedule(getUserInfoDto: getUserInfoDto) { 
        return [ReturnedStudentScheduleDto];
    }

    getTeacherSchedule(getUserInfoDto: getUserInfoDto) { 
        return [ReturnedTeacherScheduleDto];
    }
}