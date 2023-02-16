import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  ParseIntPipe,
  Query,
  HttpCode,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAnnouncementDto } from './dto/create-announcements.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnedGroupDto } from './dto/returned-group.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';
import { LogoUploadDto } from './dto/logo-upload.dto';
import { ReturnedAnnouncementDto } from './dto/returned-announcement.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { GroupAnnouncement } from '@prisma/client';
import { ReturnedAnnouncementsDto } from './dto/returned-announcements.dto';

@Controller('groups')
@ApiTags('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ description: 'create group' })
  @ApiCreatedResponse({
    description: 'group created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'you must be a teacher to create a group',
  })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({ description: 'get my groups' })
  @ApiOkResponse({
    description: 'groups returned successfully',
    type: [ReturnedGroupDto],
  })
  @ApiUnauthorizedResponse({
    description: 'you must login to get your groups',
  })
  @Get('/mine')
  getMyGroups(userId: string) {
    return this.groupService.getMyGroups(userId);
  }

  @ApiOperation({ description: 'get group by id' })
  @ApiOkResponse({
    description: 'group returned successfully',
    type: ReturnedGroupDto,
  })
  @ApiBadRequestResponse({
    description: 'invalid group id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @ApiOperation({ description: 'update group info' })
  @ApiCreatedResponse({ description: 'group updated successfully' })
  @ApiUnauthorizedResponse({
    description: 'you must be the group owner to update the group',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'logo file',
    type: LogoUploadDto,
  })
  @ApiOperation({ description: 'update group logo' })
  @ApiCreatedResponse({
    description: 'logo updated successfully',
    type: UpdateLogoDto,
  })
  @ApiUnauthorizedResponse({
    description: 'you must be the group owner to update the logo',
  })
  @Put(':id/logo')
  @UseInterceptors(FileInterceptor('logo')) // argument name
  uploadLogo(
    @Param('id') groupId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.groupService.uploadLogo(groupId, file);
  }

  @ApiOperation({ description: 'get announcements of a group.' })
  @ApiOkResponse({
    description: 'announcements of a group returned succssfully.',
    type: ReturnedAnnouncementsDto,
  })
  @ApiNotFoundResponse({ description: 'group is not found.' })
  @ApiUnauthorizedResponse({
    description: 'you must be inside the group to get the group announcements.',
  })
  @ApiBearerAuth('token')
  @ApiParam({ name: 'id', description: 'group id' })
  @ApiQuery({
    name: 'limit',
    description: 'a number determines the wanted amount of announcements',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description:
      'a number determines the wanted page of announcements (starts from 1, 2, ....)',
    required: false,
  })
  @UseGuards(JwtGuard)
  @Get(':id/announcements')
  getGroupAnnouncements(
    @GetUser() userId: number,
    @Param('id', ParseIntPipe) groupId: number,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ): Promise<{ status: string; announcements: GroupAnnouncement[] }> {
    return this.groupService.getAnnouncements(groupId, userId, +limit, +page);
  }

  @ApiOperation({ description: 'create group announcement.' })
  @ApiCreatedResponse({ description: 'announcement is created successfully.' })
  @ApiUnauthorizedResponse({
    description: 'you must be the group owner to create announcement.',
    type: ReturnedAnnouncementDto,
  })
  @ApiNotFoundResponse({ description: 'group is not found.' })
  @ApiBearerAuth('token')
  @UseGuards(JwtGuard)
  @Post(':id/announcements')
  createGroupAnnouncement(
    @Param('id', ParseIntPipe) groupId: number,
    @GetUser('teacher') teacherId: number,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<{ status: string; announcement: GroupAnnouncement }> {
    return this.groupService.createAnnouncement(
      groupId,
      teacherId,
      createAnnouncementDto,
    );
  }

  @ApiOperation({ description: 'delete group announcement.' })
  @ApiNoContentResponse({
    description: 'deleted the organization succesfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: '!تم حذف الإعلان بنجاح',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'group is not found.' })
  @ApiUnauthorizedResponse({
    description: 'you must be the group owner to delete announcement.',
  })
  @ApiBearerAuth('token')
  @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete('/:id/announcements/:announcement_id')
  deleteAnnouncement(
    @Param('id', ParseIntPipe) groupId: number,
    @GetUser('teacher') teacherId: number,
    @Param('announcement_id', ParseIntPipe) announcementId: number,
  ): Promise<{ status: string; message: string }> {
    return this.groupService.deleteAnnouncement(
      groupId,
      teacherId,
      announcementId,
    );
  }

  //TODO: add student dto here
  @ApiOperation({ description: 'get students of specific group' })
  @ApiOkResponse({ description: 'students are returned successfully' })
  @ApiBadRequestResponse({
    description: 'invalid group id',
  })
  @ApiUnauthorizedResponse({
    description: 'you must be inside a group to see its students',
  })
  @Get('/:id/students')
  getGroupStudents(@Param(':id') groupId: string) {
    return this.groupService.getGroupStudents(groupId);
  }

  @ApiOperation({
    description:
      "get students of specific group that doesn't complete the hefz",
  })
  @ApiOkResponse({ description: 'students are returned successfully' })
  @ApiBadRequestResponse({
    description: 'invalid group id',
  })
  @ApiUnauthorizedResponse({
    description: 'you must be the group owner to see this list',
  })
  @Get('/:id/students/status/incomplete')
  getUnhafezStudents(@Param(':id') groupId: string) {
    return this.groupService.getUnhafezStudents(groupId);
  }

  @ApiOperation({ description: 'mark student as hafez' })
  @ApiCreatedResponse({
    description: 'student is marked successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'you must be a teacher of the group to mark the student',
  })
  @Post('/:id/students/:student_id/status/complete')
  markStudentAsHafez(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.markStudentAsHafez(groupId, studentId);
  }

  @ApiOperation({ description: 'ask to join a group' })
  @ApiCreatedResponse({
    description: 'request is sent successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'you must be a student to request to join this group',
  })
  @ApiBadRequestResponse({ description: 'wrong group id' })
  @Put('/:id/students/me')
  askToJoinGroup(@Param(':id') groupId: string) {
    return this.groupService.askToJoinAGroup(groupId);
  }

  @ApiOperation({
    description: 'leave a group or decline join request',
  })
  @ApiOkResponse({ description: 'group is left successfully' })
  @ApiUnauthorizedResponse({
    description: 'you must login as a student to do this action',
  })
  @ApiBadRequestResponse({ description: 'you are not inside such a group' })
  @Delete('/:id/students/me')
  leaveGroup(@Param(':id') groupId: string) {
    return this.groupService.leaveGroup(groupId);
  }

  @ApiOperation({ description: 'accept student to join a group' })
  @ApiCreatedResponse({
    description: 'student is accepted successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'you must be a group owner to accept this student',
  })
  @ApiBadRequestResponse({
    description: 'wrong group id or there is no request from this user',
  })
  @ApiBadRequestResponse({ description: 'wrong group id' })
  @Put('/:id/students/:student_id')
  acceptUserToJoinAGroup(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.acceptStudent(groupId, studentId);
  }

  @ApiOperation({
    description: 'Delete a student from the group, or decline student request',
  })
  @ApiOkResponse({ description: 'student deleted successfully' })
  @ApiUnauthorizedResponse({
    description: 'only group admins can do this action',
  })
  @ApiBadRequestResponse({
    description: 'wrong group id or there is no request from this student',
  })
  @Delete('/:id/students/:student_id')
  deleteUserFromAGroup(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.deleteStudent(groupId, studentId);
  }

  @ApiOperation({ description: 'give student a badge' })
  @ApiCreatedResponse({
    description: 'badge is put to the student successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'you must be the group owner to give a badge to the student',
  })
  @ApiBadRequestResponse({
    description: 'wrong group id or there is no student with this id',
  })
  @Put('/:id/students/:student_id/badge')
  giveBadgeToStudent(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.giveBadgeToStudent(groupId, studentId);
  }

  @ApiOperation({
    description: 'remove a badge from a student',
  })
  @ApiOkResponse({ description: 'badge removed successfully' })
  @ApiUnauthorizedResponse({
    description: 'only group admins can remove students badge',
  })
  @ApiBadRequestResponse({
    description:
      'wrong group id or there is no student with this id inside the group',
  })
  @Delete('/:id/students/:student_id/badge')
  removeBadgeFromStudent(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.removeBadgeFromStudent(groupId, studentId);
  }

  @ApiOperation({
    description: 'Delete a group',
  })
  @ApiOkResponse({ description: 'group is deleted successfully' })
  @ApiUnauthorizedResponse({
    description: 'only admins can delete the group',
  })
  @ApiBadRequestResponse({ description: 'there is no group with this id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
