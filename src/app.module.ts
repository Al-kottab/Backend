import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [OrganizationModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
