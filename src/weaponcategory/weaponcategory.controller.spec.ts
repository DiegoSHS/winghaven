import { Test, TestingModule } from '@nestjs/testing';
import { WeaponcategoryController } from './weaponcategory.controller';
import { WeaponcategoryService } from './weaponcategory.service';

describe('WeaponcategoryController', () => {
  let controller: WeaponcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponcategoryController],
      providers: [WeaponcategoryService],
    }).compile();

    controller = module.get<WeaponcategoryController>(WeaponcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
