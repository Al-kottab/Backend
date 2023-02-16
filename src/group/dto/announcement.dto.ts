import { ApiProperty } from '@nestjs/swagger';

export class AnnouncementDto {
  @ApiProperty({ example: 1, required: true })
  id: number;

  @ApiProperty({ example: 'announcement text', required: true })
  text: string;

  @ApiProperty({ example: 5, required: true })
  teacherId: number;

  @ApiProperty({ example: Date.now(), required: true })
  createdAt: Date;
}
