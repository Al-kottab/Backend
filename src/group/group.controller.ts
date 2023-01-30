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
  Req,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get('/mine')
  getMyGroups(userId: string) {
    return this.groupService.getMyGroups(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Put(':id/logo')
  @UseInterceptors(FileInterceptor('logo')) // argument name
  uploadLogo(
    @Param('id') groupId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.groupService.uploadLogo(groupId, file);
  }

  //TODO: decorator to make sure that user is joining the group
  @Get('/:id/announcements')
  getGroupAnnouncements(@Param('id') groupId: string) {
    return this.groupService.getAnnouncements(groupId);
  }

  @Get('/:id/announcements')
  createGroupAnnouncement(
    @Param(':id') groupId: string,
    @Body() announcementDto: AnnouncementDto,
  ) {
    return this.groupService.createAnnouncement(groupId, announcementDto);
  }

  @Get('/:id/students')
  getGroupStudents(@Param(':id') groupId: string) {
    return this.groupService.getGroupStudents(groupId);
  }
  @Get('/:id/students/status/incomplete')
  getUnhafezStudents(@Param(':id') groupId: string) {
    return this.groupService.getUnhafezStudents(groupId);
  }
  @Post('/:id/students/:student_id/status/complete')
  markStudentAsHafez(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.markStudentAsHafez(groupId, studentId);
  }
  @Put('/:id/students/me')
  askToJoinGroup(@Param(':id') groupId: string) {
    return this.groupService.askToJoinAGroup(groupId);
  }
  @Delete('/:id/students/me')
  leaveGroup(@Param(':id') groupId: string) {
    return this.groupService.leave(groupId);
  }
  @Put('/:id/students/:student_id')
  acceptUserToJoinAGroup(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.acceptStudent(groupId, studentId);
  }
  @Delete('/:id/students/:student_id')
  deleteUserFromAGroup(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.deleteStudent(groupId, studentId);
  }
  @Post('/:id/students/:student_id/badge')
  giveBadgeToStudent(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.giveBadgeToStudent(groupId, studentId);
  }
  @Delete('/:id/students/:student_id/badge')
  removeBadgeFromStudent(
    @Param(':id') groupId: string,
    @Param(':student_id') studentId: string,
  ) {
    return this.groupService.removeBadgeFromStudent(groupId, studentId);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
