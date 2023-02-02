import { Test, TestingModule } from '@nestjs/testing';
import { globalImports } from '../utils/test.utils';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...globalImports],
      providers: [PrismaService],
    }).compile();
    service = module.get<PrismaService>(PrismaService);
  });

  describe('test prisma connection', () => {
    it('must be connected', async () => {
      await expect(service.$connect()).resolves.not.toThrowError();
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
