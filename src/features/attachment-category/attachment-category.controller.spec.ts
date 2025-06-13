import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentCategoryController } from './attachment-category.controller';
import { AttachmentCategoryService } from './attachment-category.service';

describe('AttachmentCategoryController', () => {
  let controller: AttachmentCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachmentCategoryController],
      providers: [AttachmentCategoryService],
    }).compile();

    controller = module.get<AttachmentCategoryController>(AttachmentCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
