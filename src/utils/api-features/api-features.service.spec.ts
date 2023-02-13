import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Group, GroupAnnouncement, Teacher, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiFeaturesService } from './api-features.service';
import { ApiFeaturesDto } from './dto/api-features.dto';

describe('ApiFeaturesService', () => {
  let service: ApiFeaturesService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiFeaturesService, PrismaService, ConfigService],
    }).compile();

    service = module.get<ApiFeaturesService>(ApiFeaturesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('API Features', () => {
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
    // NOTE: API Features service is general service for all models, but we test here for example ith group announcements
    describe('getPaginationList', () => {
      it('should get the 2 announcemets', async () => {
        const apiFeaturesDto: ApiFeaturesDto = {
          page: 1,
          take: 2,
          where: {
            groupId: 1,
          },
          orderBy: [
            {
              createdAt: 'desc', // asc for ascendingly
            },
          ],
        };
        prisma['groupAnnouncement'].findMany = jest
          .fn()
          .mockReturnValueOnce(announcements);
        expect(
          await service.getPaginationList('groupAnnouncement', apiFeaturesDto),
        ).toStrictEqual(announcements);
      });
      it('should get 1 announcemet because of page 1 & take 1', async () => {
        const apiFeaturesDto: ApiFeaturesDto = {
          page: 1,
          take: 1,
          where: {
            groupId: 1,
          },
          orderBy: [
            {
              createdAt: 'desc',
            },
          ],
        };
        prisma['groupAnnouncement'].findMany = jest
          .fn()
          .mockReturnValueOnce([announcements[1]]);
        expect(
          await service.getPaginationList('groupAnnouncement', apiFeaturesDto),
        ).toStrictEqual([announcements[1]]);
      });
      it('should return InternalServerErrorException because passed model is null', async () => {
        const apiFeaturesDto: ApiFeaturesDto = {
          page: 1,
          take: 1,
          where: {
            groupId: 1,
          },
          orderBy: [
            {
              createdAt: 'desc',
            },
          ],
        };
        prisma['groupAnnouncement'].findMany = jest
          .fn()
          .mockReturnValueOnce(null);
        await expect(
          service.getPaginationList(null, apiFeaturesDto),
        ).rejects.toThrowError(InternalServerErrorException);
      });
    });
  });
});
