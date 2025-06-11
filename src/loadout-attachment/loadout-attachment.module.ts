import { Module } from '@nestjs/common';
import { LoadoutAttachmentService } from './loadout-attachment.service';
import { LoadoutAttachmentController } from './loadout-attachment.controller';

@Module({
  controllers: [LoadoutAttachmentController],
  providers: [LoadoutAttachmentService],
})
export class LoadoutAttachmentModule {}
