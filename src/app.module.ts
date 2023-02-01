import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [OrganizationModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
