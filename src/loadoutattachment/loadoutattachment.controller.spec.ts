import { Test, TestingModule } from '@nestjs/testing';
import { LoadoutattachmentController } from './loadoutattachment.controller';
import { LoadoutattachmentService } from './loadoutattachment.service';

describe('LoadoutattachmentController', () => {
  let controller: LoadoutattachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadoutattachmentController],
      providers: [LoadoutattachmentService],
    }).compile();

    controller = module.get<LoadoutattachmentController>(LoadoutattachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
