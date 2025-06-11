import { Test, TestingModule } from '@nestjs/testing';
import { LoadoutAttachmentController } from './loadout-attachment.controller';
import { LoadoutAttachmentService } from './loadout-attachment.service';

describe('LoadoutAttachmentController', () => {
  let controller: LoadoutAttachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadoutAttachmentController],
      providers: [LoadoutAttachmentService],
    }).compile();

    controller = module.get<LoadoutAttachmentController>(LoadoutAttachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
