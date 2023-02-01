import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import {
    ApiOperation,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiTags,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiAcceptedResponse,
} from '@nestjs/swagger';
import { ReturnedUserDto } from 'src/auth/dto/returned-user.dto';
import { returnedUserDto } from 'src/auth/dummy-data/dummy-user';
import { getUserInfoDto } from './dto/get-user-info.dto';
import { ReturnedUserInfoDto } from './dto/returned-user-info.dto';
import { updateInfoDto } from './dto/update-info.dto';
import { UserService } from './user.service';


@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService) {}

    @ApiOperation({
    description:
        'edit all information of user other than enail and password',
    })
    @ApiOkResponse({
    description: 'updated info sucessfully',
    type: ReturnedUserDto,
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
    @Patch('me')
    update(@Body() updateInfoDto: updateInfoDto) {
    return returnedUserDto;
    }

    @ApiOperation({
    description:
        'get some information about the user',
    })
    @ApiCreatedResponse({
    description: 'returned data successfully',
    type: ReturnedUserInfoDto,
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
    @Get('me')
    getMyInfo(@Body() getUserInfoDto: getUserInfoDto) {
    return this.userService.getUser(getUserInfoDto);
    }

    @ApiOperation({
    description:
        'get user profile',
    })
    @ApiCreatedResponse({
        description: 'returned data successfully',
        type: ReturnedUserInfoDto,
    })
    @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
    @Get('me/profile')
    returnMyProfile(@Body() getUserInfoDto: getUserInfoDto) {
        return this.userService.getProfile(getUserInfoDto);
    }

    @ApiOperation({
        description:
            'get user profile',
        })
    @ApiCreatedResponse({
        description: 'returned data successfully',
        type: ReturnedUserInfoDto,
    })
    @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
    @Get(':user_id/profile')
    returnProfile(@Body() getUserInfoDto: getUserInfoDto) {
        return this.userService.getProfile(getUserInfoDto);
    }

    @ApiOperation({
        description:
            'get student schedule',
    })
    @ApiCreatedResponse({
        description: 'returned data successfully',
        type: ReturnedUserInfoDto,
    })
    @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
    @Get('/student/me/schedule')
    returnStudentSchedule(@Body() getUserInfoDto: getUserInfoDto) {
        return this.userService.getStudentSchedule(getUserInfoDto);
    }

    @ApiOperation({
        description:
            'get student schedule',
    })
    @ApiCreatedResponse({
        description: 'returned data successfully',
        type: ReturnedUserInfoDto,
    })
    @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
    @Get('/student/me/schedule')
    returnTeacherScheduleDto(@Body() getUserInfoDto: getUserInfoDto) {
        return this.userService.getTeacherSchedule(getUserInfoDto);
    }
}
