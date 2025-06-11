import { Test, TestingModule } from '@nestjs/testing';
import { WeaponCategoryController } from './weapon-category.controller';
import { WeaponCategoryService } from './weapon-category.service';

describe('WeaponCategoryController', () => {
  let controller: WeaponCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponCategoryController],
      providers: [WeaponCategoryService],
    }).compile();

    controller = module.get<WeaponCategoryController>(WeaponCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
