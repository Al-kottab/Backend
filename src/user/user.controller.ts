import { Controller, Body, Patch, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ReturnedUserDto } from 'src/auth/dto/returned-user.dto';
import { returnedUserDto } from 'src/auth/dummy-data/dummy-user';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { ReturnedStudentScheduleDto } from './dto/returned-student-schedule.dto';
import { ReturnedTeacherScheduleDto } from './dto/returned-teacher-schedule.dto';
import { ReturnedUserInfoDto } from './dto/returned-user-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'edit all information of user other than enail and password',
  })
  @ApiOkResponse({
    description: 'updated info sucessfully',
    type: ReturnedUserDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @Patch('me')
  update(@Body() updateInfoDto: UpdateInfoDto) {
    return returnedUserDto;
  }

  @ApiOperation({
    description: 'get some information about the user',
  })
  @ApiCreatedResponse({
    description: 'returned data successfully',
    type: ReturnedUserInfoDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @Get('me')
  getMyInfo(@Body() getUserInfoDto: GetUserInfoDto) {
    return this.userService.getUser(getUserInfoDto);
  }

  @ApiOperation({
    description: 'get user profile',
  })
  @ApiCreatedResponse({
    description: 'returned data successfully',
    type: ReturnedUserInfoDto,
  })
  @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
  @Get('me/profile')
  returnMyProfile(@Body() getUserInfoDto: GetUserInfoDto) {
    return this.userService.getProfile(getUserInfoDto);
  }

  @ApiOperation({
    description: 'get user profile',
  })
  @ApiCreatedResponse({
    description: 'returned data successfully',
    type: ReturnedUserInfoDto,
  })
  @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
  @Get(':user_id/profile')
  returnProfile(@Body() getUserInfoDto: GetUserInfoDto) {
    return this.userService.getProfile(getUserInfoDto);
  }

  @ApiOperation({
    description: 'get student schedule',
  })
  @ApiCreatedResponse({
    description: 'returned data successfully',
    type: ReturnedStudentScheduleDto,
  })
  @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
  @Get('/students/me/schedule')
  returnStudentSchedule(@Body() getUserInfoDto: GetUserInfoDto) {
    return this.userService.getStudentSchedule(getUserInfoDto);
  }

  @ApiOperation({
    description: 'get student schedule',
  })
  @ApiCreatedResponse({
    description: 'returned data successfully',
    type: ReturnedTeacherScheduleDto,
  })
  @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
  @Get('/teachers/me/schedule')
  returnTeacherScheduleDto(@Body() getUserInfoDto: GetUserInfoDto) {
    return this.userService.getTeacherSchedule(getUserInfoDto);
  }
}
