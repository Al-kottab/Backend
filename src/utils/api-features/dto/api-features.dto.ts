import { IsNumber, IsOptional } from 'class-validator';

export class ApiFeaturesDto {
  @IsNumber()
  @IsOptional()
  skip?: number = 0; // = is a default value
  @IsNumber()
  @IsOptional()
  limit?: number = 15;
  @IsNumber()
  @IsOptional()
  where?: any = {};
  @IsNumber()
  @IsOptional()
  orderBy?: any = {};
}
