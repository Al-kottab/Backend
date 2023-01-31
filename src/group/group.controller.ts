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
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAnnouncementDto } from './dto/create-announcements.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnedGroupDto } from './dto/returned-group.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';
import { LogoUploadDto } from './dto/logo-upload.dto';

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

  //TODO: decorator to make sure that user is joining the group

  @ApiOperation({ description: 'get announcements of a group' })
  @ApiOkResponse({
    description: 'announcements of a group returned succssfully',
    type: [AnnouncementDto],
  })
  @ApiBadRequestResponse({
    description: 'invalid group id',
  })
  @ApiUnauthorizedResponse({
    description: 'you must be inside the group to get the group announcements',
  })
  @Get('/:id/announcements')
  getGroupAnnouncements(@Param('id') groupId: string) {
    return this.groupService.getAnnouncements(groupId);
  }

  @ApiOperation({ description: 'create group announcement' })
  @ApiCreatedResponse({ description: 'announcement created successfully' })
  @ApiUnauthorizedResponse({
    description: 'you must be the group owner create announcement',
  })
  @Post('/:id/announcements')
  createGroupAnnouncement(
    @Param(':id') groupId: string,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ) {
    return this.groupService.createAnnouncement(groupId, createAnnouncementDto);
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
