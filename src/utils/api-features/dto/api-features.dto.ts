import { IsNumber, IsOptional } from 'class-validator';

export class ApiFeaturesDto {
  @IsNumber()
  @IsOptional()
  page?: number;
  @IsNumber()
  @IsOptional()
  take?: number; // take is a limit
  @IsNumber()
  @IsOptional()
  skip?: number; // used in api features service, isn't needed to passed
  @IsOptional()
  where?: any = {};
  @IsOptional()
  orderBy?: any = {};
}
