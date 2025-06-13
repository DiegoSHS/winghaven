import { Test, TestingModule } from '@nestjs/testing';
import { WeaponCategoryService } from './weapon-category.service';

describe('WeaponCategoryService', () => {
  let service: WeaponCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaponCategoryService],
    }).compile();

    service = module.get<WeaponCategoryService>(WeaponCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
