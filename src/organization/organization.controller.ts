import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnedOrganizationDto } from './dto/returned-organization.dto';
import { ReturnedUserDto } from '../auth/dto/returned-user.dto';
import { CreateOrganizationGroupDto } from './dto/create-organization-group.dto';
import { ReturnedGroupDto } from './dto/returned-group.dto';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiOperation({ description: 'Creates a new organization.' })
  @ApiCreatedResponse({
    description: 'The organization is created succesfully.',
    type: ReturnedOrganizationDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiConflictResponse({ description: 'Organization name already exists.' })
  @ApiBearerAuth('token')
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @ApiOperation({
    description: 'Gets all organizations information.',
  })
  @ApiOkResponse({
    description: 'Returned the organizations information succesfully.',
    type: [ReturnedOrganizationDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiBearerAuth('token')
  @Get()
  findAll() {
    return this.organizationService.findAll();
  }

  @ApiOperation({
    description: 'Gets a certain organization information by id.',
  })
  @ApiOkResponse({
    description: 'Returned the organization information succesfully.',
    type: ReturnedOrganizationDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization is not found.' })
  @ApiBearerAuth('token')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @ApiOperation({
    description: 'Edits a certain organization information by id.',
  })
  @ApiOkResponse({
    description: 'Edited the organization information succesfully.',
    type: ReturnedOrganizationDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization is not found.' })
  @ApiBearerAuth('token')
  @Patch(':id')
  updateInfo(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.updateInfo(id, updateOrganizationDto);
  }

  @ApiOperation({
    description:
      'Edits a certain organization logo by id (note that this is a formdata request, upload the file in formdata with key named "logo").',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Edited the organization logo succesfully.',
    type: ReturnedOrganizationDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization is not found.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiBearerAuth('token')
  @Patch(':id/update-logo')
  updateLogo(@Param('id') id: string) {
    return this.organizationService.updateLogo(id, {});
  }

  @ApiOperation({
    description: 'Deletes a certain organization by id.',
  })
  @ApiNoContentResponse({
    description: 'Deleted the organization succesfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: '.تم مسح المنظمة بنجاح',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization is not found.' })
  @ApiBearerAuth('token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }

  @ApiOperation({
    description: 'Gets all teachers of a certain organization by id.',
  })
  @ApiOkResponse({
    description: 'Returned the organization teachers succesfully.',
    type: [ReturnedUserDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization is not found.' })
  @ApiBearerAuth('token')
  @Get(':id/teachers')
  getAllTeachers(@Param('id') id: string) {
    return this.organizationService.getAllTeachers(id);
  }

  @ApiOperation({
    description: 'Current teacher asks to join a certain organization by id.',
  })
  @ApiOkResponse({
    description: 'Joining organization request is sent successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: '.تم إرسال طلب الدخول إلى هذه المنظمة بنجاح',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization is not found.' })
  @ApiBearerAuth('token')
  @Put(':id/teachers/me')
  askToJoin(@Param('id') id: string) {
    return this.organizationService.askToJoin(id);
  }

  @ApiOperation({
    description:
      'Accept a certain teacher by id that asked to join a certain organization by id.',
  })
  @ApiOkResponse({
    description: 'Accepted joining organization request successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: '.تم قبول طلب هذا المحفظ للدخول إلى هذه المنظمة بنجاح',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization or teacher is not found.' })
  @ApiBearerAuth('token')
  @Put(':id/teachers/:teacherId')
  acceptJoiningRequest(
    @Param('id') id: string,
    @Param('teacherId') teacherId: string,
  ) {
    return this.organizationService.acceptJoiningRequest(id, teacherId);
  }

  @ApiOperation({
    description:
      'Current teacher wants to leave or cancel joining a certain organization by id.',
  })
  @ApiOkResponse({
    description: 'Left organization successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: '.تم مغادرة المنظمة بنجاح',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization is not found.' })
  @ApiBearerAuth('token')
  @Delete(':id/teachers/me')
  leave(@Param('id') id: string) {
    return this.organizationService.leave(id);
  }

  @ApiOperation({
    description:
      'Remove (or decline joining) a certain teacher by id from a certain organization by id.',
  })
  @ApiOkResponse({
    description:
      'Removed (or declined joining) teacher from organization successfully.',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: '.تم مسح هذا المحفظ من المنظمة بنجاح',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization or teacher is not found.' })
  @ApiBearerAuth('token')
  @Delete(':id/teachers/:teacherId')
  deleteTeacher(
    @Param('id') id: string,
    @Param('teacherId') teacherId: string,
  ) {
    return this.organizationService.deleteTeacher(id, teacherId);
  }

  @ApiOperation({
    description: 'Creates a new group under a certain organization by id.',
  })
  @ApiCreatedResponse({
    description: 'The group is created under this organization succesfully.',
    type: ReturnedGroupDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiConflictResponse({
    description: 'Group name under this organization already exists.',
  })
  @ApiBearerAuth('token')
  @Post(':id/groups')
  createGroup(@Body() createOrganizationGroupDto: CreateOrganizationGroupDto) {
    return this.organizationService.createGroup(createOrganizationGroupDto);
  }

  @ApiOperation({
    description:
      'Gets all groups information under a certain organization by id.',
  })
  @ApiOkResponse({
    description:
      'Returned all groups information under this organization succesfully.',
    type: [ReturnedGroupDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiNotFoundResponse({ description: 'Organization or group is not found.' })
  @ApiBearerAuth('token')
  @Get(':id/groups')
  getAllGroups(@Param('id') id: string) {
    return this.organizationService.getAllGroups(id);
  }
}
