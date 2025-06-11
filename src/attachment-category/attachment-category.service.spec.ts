import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentCategoryService } from './attachment-category.service';

describe('AttachmentCategoryService', () => {
  let service: AttachmentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachmentCategoryService],
    }).compile();

    service = module.get<AttachmentCategoryService>(AttachmentCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
