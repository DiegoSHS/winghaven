import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AttachmentCategoryService } from './attachment-category.service';
import { CreateAttachmentCategoryDto } from './dto/create-attachment-category.dto';
import { UpdateAttachmentCategoryDto } from './dto/update-attachment-category.dto';
import { customIdPipe } from 'src/common/validation';

@Controller('attachment-category')
export class AttachmentCategoryController {
  constructor(private readonly attachmentCategoryService: AttachmentCategoryService) { }

  @Post()
  create(@Body() createAttachmentCategoryDto: CreateAttachmentCategoryDto | CreateAttachmentCategoryDto[]) {
    if (Array.isArray(createAttachmentCategoryDto)) {
      return this.attachmentCategoryService.bulkCreate(createAttachmentCategoryDto);
    }
    return this.attachmentCategoryService.create(createAttachmentCategoryDto);
  }

  @Get()
  findAll(
    @Query('id', customIdPipe) id?: number,
  ) {
    if (id) return this.attachmentCategoryService.findOne(id);
    return this.attachmentCategoryService.findAll();
  }

  @Patch(':id')
  update(@Param('id', customIdPipe) id: number, @Body() updateAttachmentCategoryDto: UpdateAttachmentCategoryDto) {
    return this.attachmentCategoryService.update(id, updateAttachmentCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.attachmentCategoryService.remove(id);
  }
}
