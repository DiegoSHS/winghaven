import { Module } from '@nestjs/common';
import { LoadoutattachmentService } from './loadoutattachment.service';
import { LoadoutattachmentController } from './loadoutattachment.controller';

@Module({
  controllers: [LoadoutattachmentController],
  providers: [LoadoutattachmentService],
})
export class LoadoutattachmentModule {}
