import {
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Group, GroupAnnouncement, Teacher, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ApiFeaturesService } from '../utils/api-features/api-features.service';
import { CreateAnnouncementDto } from './dto/create-announcements.dto';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;
  let prisma: PrismaService;
  let apiFeatures: ApiFeaturesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        ApiFeaturesService,
        PrismaService,
        ConfigService,
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    prisma = module.get<PrismaService>(PrismaService);
    apiFeatures = module.get<ApiFeaturesService>(ApiFeaturesService);
  });
  describe('Announcement', () => {
    const userStudent: User = {
      id: 3,
      name: '3 معاذ محمد',
      username: 'MoazHassan2023',
      email: 'moaz3@gmail.com',
      passwordHash: 'wedwed4564',
      createdAt: new Date(Date.now()),
      phone: null,
      creditCard: null,
      photo: null,
    };
    const teacher1: Teacher = {
      id: 1,
    };
    const group: Group = {
      id: 1,
      name: 'الحق',
      teacherId: 1,
      createdAt: new Date(Date.now()),
      organizationId: null,
    };
    const announcements: GroupAnnouncement[] = [
      {
        id: 1,
        teacherId: 1,
        groupId: 1,
        text: 'نص إعلان',
        createdAt: new Date(Date.now()),
      },
      {
        id: 2,
        teacherId: 1,
        groupId: 1,
        text: 'نص إعلان ثان',
        createdAt: new Date(Date.now()),
      },
    ];
    const announcementDto: CreateAnnouncementDto = {
      text: 'نص إعلان',
    };
    describe('createAnnouncement', () => {
      it('should create an announcement and return it', async () => {
        prisma.$queryRaw = jest.fn().mockReturnValueOnce(announcements);
        expect(
          (
            await service.createAnnouncement(
              group.id,
              teacher1.id,
              announcementDto,
            )
          ).announcement,
        ).toStrictEqual(announcements[0]);
      });
      it('should return UnprocessableEntityException because teacherId is null (user is a student)', async () => {
        prisma.$queryRaw = jest.fn().mockReturnValueOnce([]);
        await expect(
          service.createAnnouncement(group.id, null, announcementDto),
        ).rejects.toThrowError(UnprocessableEntityException);
      });
      it('should return UnprocessableEntityException because the group with this id is not found', async () => {
        prisma.$queryRaw = jest.fn().mockReturnValueOnce([]);
        await expect(
          service.createAnnouncement(500, teacher1.id, announcementDto),
        ).rejects.toThrowError(UnprocessableEntityException);
      });
      it('should return UnprocessableEntityException because passed teacherId is not equal to group.teacherId', async () => {
        prisma.$queryRaw = jest.fn().mockReturnValueOnce([]);
        await expect(
          service.createAnnouncement(group.id, 2, announcementDto),
        ).rejects.toThrowError(UnprocessableEntityException);
      });
    });
    describe('getAnnouncements', () => {
      it('should get the 2 announcemets', async () => {
        prisma.group.findUnique = jest.fn().mockReturnValueOnce(group);
        prisma.groupStudent.count = jest.fn().mockReturnValueOnce(1);
        apiFeatures.getPaginationList = jest
          .fn()
          .mockReturnValueOnce(announcements);
        expect(
          (await service.getAnnouncements(group.id, userStudent.id, 2, 1))
            .announcements,
        ).toStrictEqual(announcements);
      });
      it('should return UnauthorizedException because userId is null', async () => {
        prisma.group.findUnique = jest.fn().mockReturnValueOnce(group);
        prisma.groupStudent.count = jest.fn().mockReturnValueOnce(1);
        apiFeatures.getPaginationList = jest.fn().mockReturnValueOnce(null);
        await expect(
          service.getAnnouncements(group.id, null, 2, 1),
        ).rejects.toThrowError(UnauthorizedException);
      });
      it('should return NotFoundException because the group with this id is not found', async () => {
        prisma.group.findUnique = jest.fn().mockReturnValueOnce(null);
        prisma.groupStudent.count = jest.fn().mockReturnValueOnce(1);
        apiFeatures.getPaginationList = jest.fn().mockReturnValueOnce(null);
        await expect(
          service.getAnnouncements(500, userStudent.id, 2, 1),
        ).rejects.toThrowError(NotFoundException);
      });
      it('should return UnauthorizedException because passed userId is not equal to group.teacherId and the user is not a student in this group', async () => {
        prisma.group.findUnique = jest.fn().mockReturnValueOnce(group);
        prisma.groupStudent.count = jest.fn().mockReturnValueOnce(0);
        apiFeatures.getPaginationList = jest.fn().mockReturnValueOnce(null);
        await expect(
          service.getAnnouncements(group.id, 500, 2, 1),
        ).rejects.toThrowError(UnauthorizedException);
      });
    });
    describe('deleteAnnouncement', () => {
      it('should delete an announcement and return status success', async () => {
        prisma.$queryRaw = jest.fn().mockReturnValueOnce(announcements);
        expect(
          (await service.deleteAnnouncement(teacher1.id, 1)).status,
        ).toEqual('success');
      });
      it('should return UnprocessableEntityException because teacherId is null (user is a student)', async () => {
        prisma.$queryRaw = jest.fn().mockReturnValueOnce([]);
        await expect(service.deleteAnnouncement(null, 1)).rejects.toThrowError(
          UnprocessableEntityException,
        );
      });
      it('should return UnprocessableEntityException because passed teacherId is not equal to group.teacherId', async () => {
        prisma.$queryRaw = jest.fn().mockReturnValueOnce([]);
        await expect(service.deleteAnnouncement(2, 1)).rejects.toThrowError(
          UnprocessableEntityException,
        );
      });
    });
  });
});
