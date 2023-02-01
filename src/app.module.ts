import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
@Module({
  imports: [GroupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
