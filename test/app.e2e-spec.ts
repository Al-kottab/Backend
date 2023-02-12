import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthSignupDto } from '../src/auth/dto/auth-signup.dto';
import { CreateAnnouncementDto } from 'src/group/dto/create-announcements.dto';
import { Group } from '@prisma/client';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    app.setGlobalPrefix('api/v1');
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333/api/v1/');
  });
  afterAll(() => {
    app.close();
  });
  const studentDto: AuthSignupDto = {
    email: 'moazStudent@gmail.com',
    password: '123',
    name: 'معاذ محمد',
    username: 'MoazHassan2023',
    type: 'student',
  };
  const teacherDto: AuthSignupDto = {
    email: 'moaz@gmail.com',
    password: '123',
    name: 'معاذ محمد',
    username: 'MoazHassan2022',
    type: 'teacher',
  };
  var studentId: number, teacherId: number;
  describe('Auth', () => {
    const subDomain = 'accounts/';
    describe('Signup', () => {
      it('should sign up a new student', () => {
        return pactum
          .spec()
          .post(subDomain + 'signup/')
          .withBody(studentDto)
          .expectStatus(201)
          .stores('studentToken', 'token')
          .expect((ctx) => {
            studentId = ctx.res.body.user.id;
          });
      });
      it('should sign up a new teacher', () => {
        return pactum
          .spec()
          .post(subDomain + 'signup/')
          .withBody(teacherDto)
          .expectStatus(201)
          .stores('teacherToken', 'token')
          .expect((ctx) => {
            teacherId = ctx.res.body.user.id;
          });
      });
    });
  });
  describe('Group', () => {
    const subDomain = 'groups/';
    const dto: CreateAnnouncementDto = {
      text: 'نص إعلان',
    };
    let group: Group;
    describe('Create a group announcement', () => {
      it('should create a group announcement for current user', async () => {
        // TODO: this queries to be removed
        group = await prisma.group.create({
          data: {
            name: 'الحق',
            teacherId,
          },
        });
        await prisma.groupStudent.create({
          data: {
            groupId: group.id,
            studentId,
          },
        });
        return pactum
          .spec()
          .post(subDomain + `${group.id}/announcements`)
          .withHeaders('Authorization', `Bearer $S{teacherToken}`)
          .withBody(dto)
          .expectStatus(201)
          .expectBodyContains(dto.text)
          .stores('announcementId', 'id');
      });
    });
  });
});
