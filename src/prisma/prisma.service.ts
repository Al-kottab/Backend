import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  cleanDb() {
    return this.$transaction([
      this.studentBadge.deleteMany(),
      this.badge.deleteMany(),
      this.groupAnnouncement.deleteMany(),
      this.organizationTeacher.deleteMany(),
      this.groupStudent.deleteMany(),
      this.group.deleteMany(),
      this.organization.deleteMany(),
      this.student.deleteMany(),
      this.teacher.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
