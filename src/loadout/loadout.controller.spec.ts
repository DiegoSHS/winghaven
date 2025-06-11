import { Test, TestingModule } from '@nestjs/testing';
import { LoadoutController } from './loadout.controller';
import { LoadoutService } from './loadout.service';

describe('LoadoutController', () => {
  let controller: LoadoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadoutController],
      providers: [LoadoutService],
    }).compile();

    controller = module.get<LoadoutController>(LoadoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
