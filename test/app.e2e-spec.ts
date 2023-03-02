import { HttpStatus, ValidationPipe } from '@nestjs/common';
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
  // Defining global DTOs
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
  const teacherDto2: AuthSignupDto = {
    email: 'moaz2@gmail.com',
    password: '123',
    name: 'معاذ محمد',
    username: 'MoazHassan2021',
    type: 'teacher',
  };
  let studentId: number,
    teacherId: number,
    announcementId1: number,
    announcementId2: number;
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
      it('should sign up a second new teacher', () => {
        return pactum
          .spec()
          .post(subDomain + 'signup/')
          .withBody(teacherDto2)
          .expectStatus(201)
          .stores('teacherToken2', 'token');
      });
    });
  });
  describe('Group', () => {
    const subDomain = 'groups/';
    const announcementDto1: CreateAnnouncementDto = {
      text: 'نص إعلان',
    };
    const announcementDto2: CreateAnnouncementDto = {
      text: 'نص إعلان ثان',
    };
    let group: Group;
    describe('Create a group announcement', () => {
      it('should create a group announcement by a teacher', async () => {
        // TODO: this queries are to be removed when create group and join a group are implemented
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
          .withBody(announcementDto1)
          .expectStatus(201)
          .expectBodyContains(announcementDto1.text)
          .expect((ctx) => {
            announcementId1 = ctx.res.body.announcement.id;
          });
      });
      it('should create a second group announcement by a teacher', async () => {
        return pactum
          .spec()
          .post(subDomain + `${group.id}/announcements`)
          .withHeaders('Authorization', `Bearer $S{teacherToken}`)
          .withBody(announcementDto2)
          .expectStatus(HttpStatus.CREATED)
          .expectBodyContains(announcementDto2.text)
          .expect((ctx) => {
            announcementId2 = ctx.res.body.announcement.id;
          });
      });
      it('should return unprocessable entity for creating a group announcement by a student', async () => {
        return pactum
          .spec()
          .post(subDomain + `${group.id}/announcements`)
          .withHeaders('Authorization', `Bearer $S{studentToken}`)
          .withBody(announcementDto1)
          .expectStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      });
      it('should return unprocessable entity for creating a group announcement of wrong id', async () => {
        return pactum
          .spec()
          .post(subDomain + `99999/announcements`)
          .withHeaders('Authorization', `Bearer $S{teacherToken}`)
          .withBody(announcementDto1)
          .expectStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      });
      it('should return unprocessable entity for creating a group announcement by a teacher but not this group teacher', async () => {
        return pactum
          .spec()
          .post(subDomain + `${group.id}/announcements`)
          .withHeaders('Authorization', `Bearer $S{teacherToken2}`)
          .withBody(announcementDto1)
          .expectStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      });
    });
    describe('Get group announcements', () => {
      it('should get 1 group announcement because of page 2, limit 1 and all announcements of this group are 2 by a joined user to this group', async () => {
        return pactum
          .spec()
          .get(subDomain + `${group.id}/announcements?page=2&limit=1`)
          .withHeaders('Authorization', `Bearer $S{studentToken}`)
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.announcements).toHaveLength(1);
          })
          .expectBodyContains(announcementDto1.text); // they are ordered by descendingly, so when skipping 1 we return to the older
      });
      it('should get 1 group announcement because of limit 1 and all announcements of this group are 2 by a joined user to this group', async () => {
        return pactum
          .spec()
          .get(subDomain + `${group.id}/announcements?limit=1`)
          .withHeaders('Authorization', `Bearer $S{studentToken}`)
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.announcements).toHaveLength(1);
          })
          .expectBodyContains(announcementDto2.text); // they are ordered by descendingly, so when limiting to 1 we get the newer
      });
      it('should get <= 15 group announcement because of default limit of 15 by a joined user to this group', async () => {
        return pactum
          .spec()
          .get(subDomain + `${group.id}/announcements`)
          .withHeaders('Authorization', `Bearer $S{studentToken}`)
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.announcements.length).toBeLessThan(15);
          })
          .expectBodyContains(announcementDto2.text); // they are ordered by descendingly, so when limiting to 1 we get the newer
      });
      it('should return unauthorized for getting group announcements by a non joined user to this group', async () => {
        return pactum
          .spec()
          .get(subDomain + `${group.id}/announcements`)
          .withHeaders('Authorization', `Bearer $S{teacherToken2}`)
          .withBody(announcementDto1)
          .expectStatus(401);
      });
      it('should return not found for a wrong id of a group', async () => {
        return pactum
          .spec()
          .get(subDomain + `99999/announcements`)
          .withHeaders('Authorization', `Bearer $S{teacherToken}`)
          .withBody(announcementDto1)
          .expectStatus(404);
      });
    });
    describe('Delete a group announcement', () => {
      it('should delete a group announcement by a teacher', async () => {
        return pactum
          .spec()
          .delete(subDomain + `${group.id}/announcements/${announcementId1}`)
          .withHeaders('Authorization', `Bearer $S{teacherToken}`)
          .expectStatus(HttpStatus.NO_CONTENT);
      });
      it('should return unprocessable entity for deleting a group announcement by a student', async () => {
        return pactum
          .spec()
          .delete(subDomain + `${group.id}/announcements/${announcementId2}`)
          .withHeaders('Authorization', `Bearer $S{studentToken}`)
          .expectStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      });
      it('should return unprocessable entity for deleting a group announcement by a teacher but not this group teacher', async () => {
        return pactum
          .spec()
          .delete(subDomain + `${group.id}/announcements/${announcementId2}`)
          .withHeaders('Authorization', `Bearer $S{teacherToken2}`)
          .expectStatus(HttpStatus.UNPROCESSABLE_ENTITY);
      });
    });
    describe('Ask to join a group', () => {
      it('should ask to join a group by a student', async () => {
        // TODO: this queries are to be removed when create group and join a group are implemented
        group = await prisma.group.create({
          data: {
            name: '2الحق',
            teacherId,
          },
        });
        return pactum
          .spec()
          .put(subDomain + `${group.id}/students/me`)
          .withHeaders('Authorization', `Bearer $S{studentToken}`)
          .expectStatus(HttpStatus.OK)
          .expectBodyContains('success');
      });
      it('should return conflict exception for trying to request to join the group twice', async () => {
        return pactum
          .spec()
          .put(subDomain + `${group.id}/students/me`)
          .withHeaders('Authorization', `Bearer $S{studentToken}`)
          .expectStatus(HttpStatus.CONFLICT);
      });
      it('should return not found exception for trying to join a group with wrong id', async () => {
        return pactum
          .spec()
          .put(subDomain + `99999/students/me`)
          .withHeaders('Authorization', `Bearer $S{studentToken}`)
          .expectStatus(HttpStatus.NOT_FOUND);
      });
    });
  });
});
