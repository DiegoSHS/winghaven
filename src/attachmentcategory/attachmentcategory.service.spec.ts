import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentcategoryService } from './attachmentcategory.service';

describe('AttachmentcategoryService', () => {
  let service: AttachmentcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachmentcategoryService],
    }).compile();

    service = module.get<AttachmentcategoryService>(AttachmentcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
