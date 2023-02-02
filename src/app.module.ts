import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [OrganizationModule, AuthModule, UserModule, GroupModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
