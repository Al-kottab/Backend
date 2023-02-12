import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiFeaturesDto } from './dto/api-features.dto';

@Injectable()
export class ApiFeaturesService {
  constructor(private prisma: PrismaService) {}

  async getPaginationList(
    model: string,
    apiFeaturesDto: ApiFeaturesDto,
  ): Promise<any[]> {
    if (!model) throw new InternalServerErrorException('No model provided!');
    apiFeaturesDto.take = apiFeaturesDto.take || 15;
    apiFeaturesDto.skip = apiFeaturesDto.skip || 0;
    return this.prisma[model].findMany({
      ...apiFeaturesDto,
    });
  }
}
