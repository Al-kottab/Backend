import { Test, TestingModule } from '@nestjs/testing';
import { ApiFeaturesService } from './api-features.service';

describe('ApiFeaturesService', () => {
  let service: ApiFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiFeaturesService],
    }).compile();

    service = module.get<ApiFeaturesService>(ApiFeaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
