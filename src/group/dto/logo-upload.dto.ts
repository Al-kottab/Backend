import { ApiProperty } from '@nestjs/swagger';

export class LogoUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
