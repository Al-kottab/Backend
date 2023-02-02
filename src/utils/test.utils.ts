import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

export const globalImports = [
  ConfigModule.forRoot({ isGlobal: true }),
  PrismaModule,
];
