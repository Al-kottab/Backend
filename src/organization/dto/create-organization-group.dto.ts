import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationGroupDto {
  @ApiProperty({ example: 'الحق', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 15,
    required: true,
    description: 'This date is in 24 hours system.',
  })
  @IsNumber()
  @IsNotEmpty()
  dailyAppointment: number;
}
