import { Test, TestingModule } from '@nestjs/testing';
import { LoadoutAttachmentService } from './loadout-attachment.service';

describe('LoadoutAttachmentService', () => {
  let service: LoadoutAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadoutAttachmentService],
    }).compile();

    service = module.get<LoadoutAttachmentService>(LoadoutAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
