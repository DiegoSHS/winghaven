import { Test, TestingModule } from '@nestjs/testing';
import { LoadoutattachmentService } from './loadoutattachment.service';

describe('LoadoutattachmentService', () => {
  let service: LoadoutattachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoadoutattachmentService],
    }).compile();

    service = module.get<LoadoutattachmentService>(LoadoutattachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
