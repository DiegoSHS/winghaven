import { Module } from '@nestjs/common';
import { AttachmentcategoryService } from './attachmentcategory.service';
import { AttachmentcategoryController } from './attachmentcategory.controller';

@Module({
  controllers: [AttachmentcategoryController],
  providers: [AttachmentcategoryService],
})
export class AttachmentcategoryModule {}
