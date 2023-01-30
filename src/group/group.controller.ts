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
  @Get('/:id/students/status/incomplete')
  @Post('/:id/students/:student_id/status/complete')
  @Put('/:id/students/me')
  @Delete('/:id/students/me')
  @Put('/:id/students/:student_id')
  @Delete('/:id/students/:student_id')
  @Post('/:id/students/:student_id/badge')
  @Delete('/:id/students/:student_id/badge')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
