import { Injectable } from '@nestjs/common';
import { CreateOrganizationGroupDto } from './dto/create-organization-group.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { groupResponseDto } from './dummy-data/dummy-group';
import { organizationResponseDto } from './dummy-data/dummy-organization';
import { userResponseDto } from './dummy-data/dummy-user';

@Injectable()
export class OrganizationService {
  create(createOrganizationDto: CreateOrganizationDto) {
    return organizationResponseDto;
  }

  findAll() {
    return [organizationResponseDto];
  }

  findOne(id: string) {
    return organizationResponseDto;
  }

  updateInfo(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return organizationResponseDto;
  }

  updateLogo(id: string, logo: unknown) {
    return organizationResponseDto;
  }

  remove(id: string) {
    return {
      message: '.تم مسح المنظمة بنجاح',
    };
  }

  getAllTeachers(id: string) {
    return [userResponseDto];
  }

  askToJoin(id: string) {
    return {
      message: '.تم إرسال طلب الدخول إلى هذه المنظمة بنجاح',
    };
  }

  acceptJoiningRequest(id: string, teacherId: string) {
    return {
      message: '.تم قبول طلب هذا المحفظ للدخول إلى هذه المنظمة بنجاح',
    };
  }

  leave(id: string) {
    return {
      message: '.تم مغادرة المنظمة بنجاح',
    };
  }

  deleteTeacher(id: string, teacherId: string) {
    return {
      message: '.تم مسح هذا المحفظ من المنظمة بنجاح',
    };
  }

  createGroup(createOrganizationGroupDto: CreateOrganizationGroupDto) {
    return groupResponseDto;
  }

  getAllGroups(id: string) {
    return [groupResponseDto];
  }
}
