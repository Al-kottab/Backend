import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReturnedTeacherScheduleDto {
  @ApiProperty({ example: '1e234', required: true })
  @IsString()
  @IsNotEmpty()
  groupId: string;
  @ApiProperty({ example: 'group 1', required: true })
  @IsString()
  @IsNotEmpty()
  groupName: string;
  @ApiProperty({ example: '12:00:00Z', required: true })
  @IsString()
  @IsNotEmpty()
  appointment: string;
  @ApiProperty({ example: '1e2168', required: false })
  @IsString()
  @IsOptional()
  organizationId: string;
  @ApiProperty({ example: 'organization 1', required: false })
  @IsString()
  @IsOptional()
  organizationName: string;
}
