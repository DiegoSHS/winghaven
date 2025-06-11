import { Test, TestingModule } from '@nestjs/testing';
import { WeaponcategoryService } from './weaponcategory.service';

describe('WeaponcategoryService', () => {
  let service: WeaponcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaponcategoryService],
    }).compile();

    service = module.get<WeaponcategoryService>(WeaponcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
