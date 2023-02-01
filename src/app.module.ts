import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { OrganizationModule } from './organization/organization.module';
@Module({
  imports: [OrganizationModule, GroupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
