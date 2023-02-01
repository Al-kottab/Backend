import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [OrganizationModule, AuthModule, UserModule, GroupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
