import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: (() => {
            console.log(config.get('DATABASE_URL'));
            return config.get('DATABASE_URL');
          })(),
        },
      },
    });
  }
}
