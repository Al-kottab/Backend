import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationResponseDto {
  @ApiProperty({ example: '456e2', required: true })
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty({ example: 'الحق', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'هذه المنظومة لحفظ القرآن', required: false })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({ example: '2004-05-23T14:25:10', required: true })
  @IsString()
  @IsNotEmpty()
  createdAt: string;
  @ApiProperty({ example: '5646ede', required: true })
  @IsString()
  @IsNotEmpty()
  creatorId: string;
  @ApiProperty({
    example: 'photo.jpg',
    required: false,
    description:
      'Access this photo file through /api/v1/public/organizations/files/{photo filename}',
  })
  @IsString()
  @IsOptional()
  logo?: string;
}
