import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { ApiFeaturesService } from '../utils/api-features/api-features.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, ApiFeaturesService],
})
export class GroupModule {}
