import { ApiProperty } from '@nestjs/swagger';

export class ReturnedAnnouncementDto {
  @ApiProperty({ description: 'announcement text' })
  text: string;

  @ApiProperty({ description: 'information about the teacher' })
  teacherInfo: any;

  @ApiProperty({ description: 'date which announcement is created at' })
  createdAt: Date;
}
