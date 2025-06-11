import { Module } from '@nestjs/common';
import { AttachmentCategoryService } from './attachment-category.service';
import { AttachmentCategoryController } from './attachment-category.controller';

@Module({
  controllers: [AttachmentCategoryController],
  providers: [AttachmentCategoryService],
})
export class AttachmentCategoryModule {}
