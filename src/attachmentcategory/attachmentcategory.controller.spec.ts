import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentcategoryController } from './attachmentcategory.controller';
import { AttachmentcategoryService } from './attachmentcategory.service';

describe('AttachmentcategoryController', () => {
  let controller: AttachmentcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachmentcategoryController],
      providers: [AttachmentcategoryService],
    }).compile();

    controller = module.get<AttachmentcategoryController>(AttachmentcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
