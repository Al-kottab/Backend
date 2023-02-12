import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiFeaturesDto } from './dto/api-features.dto';

@Injectable()
export class ApiFeaturesService {
  constructor(private prisma: PrismaService) {}

  async getPaginationList(
    model: any,
    apiFeaturesDto: ApiFeaturesDto,
  ): Promise<any[]> {
    return this.prisma[model].findMany({
      ...apiFeaturesDto,
    });
  }
}
