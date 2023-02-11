import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReturnedTeacherScheduleDto {
  @ApiProperty({ example: 12345, required: true })
  @IsNumber()
  @IsNotEmpty()
  groupId: number;
  @ApiProperty({ example: 'group 1', required: true })
  @IsString()
  @IsNotEmpty()
  groupName: string;
  @ApiProperty({ example: '12:00:00Z', required: true })
  @IsString()
  @IsNotEmpty()
  appointment: string;
  @ApiProperty({ example: 3154, required: false })
  @IsNumber()
  @IsOptional()
  organizationId: number;
  @ApiProperty({ example: 'organization 1', required: false })
  @IsString()
  @IsOptional()
  organizationName: string;
}
