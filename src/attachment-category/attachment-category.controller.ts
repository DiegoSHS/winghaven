import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttachmentCategoryService } from './attachment-category.service';
import { CreateAttachmentCategoryDto } from './dto/create-attachment-category.dto';
import { UpdateAttachmentCategoryDto } from './dto/update-attachment-category.dto';

@Controller('attachment-category')
export class AttachmentCategoryController {
  constructor(private readonly attachmentCategoryService: AttachmentCategoryService) {}

  @Post()
  create(@Body() createAttachmentCategoryDto: CreateAttachmentCategoryDto) {
    return this.attachmentCategoryService.create(createAttachmentCategoryDto);
  }

  @Get()
  findAll() {
    return this.attachmentCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachmentCategoryDto: UpdateAttachmentCategoryDto) {
    return this.attachmentCategoryService.update(+id, updateAttachmentCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentCategoryService.remove(+id);
  }
}
