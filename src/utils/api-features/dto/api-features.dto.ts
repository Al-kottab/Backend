import { IsNumber, IsOptional } from 'class-validator';

export class ApiFeaturesDto {
  @IsNumber()
  @IsOptional()
  skip?: number;
  @IsNumber()
  @IsOptional()
  take?: number; // take is a limit
  @IsNumber()
  @IsOptional()
  where?: any = {};
  @IsNumber()
  @IsOptional()
  orderBy?: any = {};
}
