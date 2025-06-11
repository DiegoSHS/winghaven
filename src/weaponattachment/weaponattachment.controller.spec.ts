import { Test, TestingModule } from '@nestjs/testing';
import { WeaponattachmentController } from './weaponattachment.controller';
import { WeaponattachmentService } from './weaponattachment.service';

describe('WeaponattachmentController', () => {
  let controller: WeaponattachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponattachmentController],
      providers: [WeaponattachmentService],
    }).compile();

    controller = module.get<WeaponattachmentController>(WeaponattachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
