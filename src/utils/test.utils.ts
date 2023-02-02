import { ConfigModule } from '@nestjs/config';

export const globalImports = [
  ConfigModule.forRoot({ envFilePath: '../../.env.test', isGlobal: true }),
];
