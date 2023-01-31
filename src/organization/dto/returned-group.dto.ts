import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnedGroupDto {
  @ApiProperty({ example: '456e2', required: true })
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty({ example: 'الحق', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 15,
    required: true,
    description: 'This date is in 24 hours system.',
  })
  @IsString()
  @IsNotEmpty()
  dailyAppointment: number;
  @ApiProperty({ example: '2004-05-23T14:25:10', required: true })
  @IsString()
  @IsNotEmpty()
  createdAt: string;
  @ApiProperty({ example: '5646ede', required: false })
  @IsString()
  @IsOptional()
  organizationId?: string;
  @ApiProperty({ example: 'de45fe', required: true })
  @IsString()
  @IsNotEmpty()
  teacherId: string;
  @ApiProperty({
    example: 'photo.jpg',
    required: false,
    description:
      'Access this photo file through /api/v1/public/groups/files/{photo filename}',
  })
  @IsString()
  @IsOptional()
  logo?: string;
}
