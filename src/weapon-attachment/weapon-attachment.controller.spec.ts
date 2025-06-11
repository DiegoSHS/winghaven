import { Test, TestingModule } from '@nestjs/testing';
import { WeaponAttachmentController } from './weapon-attachment.controller';
import { WeaponAttachmentService } from './weapon-attachment.service';

describe('WeaponAttachmentController', () => {
  let controller: WeaponAttachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponAttachmentController],
      providers: [WeaponAttachmentService],
    }).compile();

    controller = module.get<WeaponAttachmentController>(WeaponAttachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
