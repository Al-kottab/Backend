import { Injectable } from '@nestjs/common';
import { CreateOrganizationGroupDto } from './dto/create-organization-group.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { returnedGroupDto } from './dummy-data/dummy-group';
import { returnedOrganizationDto } from './dummy-data/dummy-organization';
import { ReturnedOrganizationDto } from './dto/returned-organization.dto';
import { ReturnedGroupDto } from './dto/returned-group.dto';
import { ReturnedUserDto } from '../user/dto/returned-user.dto';
import { returnedUserDto } from '../user/dummy-data/dummy-user';

@Injectable()
export class OrganizationService {
  create(
    createOrganizationDto: CreateOrganizationDto,
  ): ReturnedOrganizationDto {
    return returnedOrganizationDto;
  }

  findAll(): [ReturnedOrganizationDto] {
    return [returnedOrganizationDto];
  }

  findOne(id: string): ReturnedOrganizationDto {
    return returnedOrganizationDto;
  }

  updateInfo(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): ReturnedOrganizationDto {
    return returnedOrganizationDto;
  }

  updateLogo(id: string, logo: unknown): ReturnedOrganizationDto {
    return returnedOrganizationDto;
  }

  remove(id: string): { status: string; message: string } {
    return {
      status: 'success',
      message: '.تم مسح المنظمة بنجاح',
    };
  }

  getAllTeachers(id: string): [ReturnedUserDto] {
    return [returnedUserDto];
  }

  askToJoin(id: string): { status: string; message: string } {
    return {
      status: 'success',
      message: '.تم إرسال طلب الدخول إلى هذه المنظمة بنجاح',
    };
  }

  acceptJoiningRequest(
    id: string,
    teacherId: string,
  ): { status: string; message: string } {
    return {
      status: 'success',
      message: '.تم قبول طلب هذا المحفظ للدخول إلى هذه المنظمة بنجاح',
    };
  }

  leave(id: string): { status: string; message: string } {
    return {
      status: 'success',
      message: '.تم مغادرة المنظمة بنجاح',
    };
  }

  deleteTeacher(
    id: string,
    teacherId: string,
  ): { status: string; message: string } {
    return {
      status: 'success',
      message: '.تم مسح هذا المحفظ من المنظمة بنجاح',
    };
  }

  createGroup(
    createOrganizationGroupDto: CreateOrganizationGroupDto,
  ): ReturnedGroupDto {
    return returnedGroupDto;
  }

  getAllGroups(id: string): [ReturnedGroupDto] {
    return [returnedGroupDto];
  }
}
