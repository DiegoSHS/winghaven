import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttachmentcategoryService } from './attachmentcategory.service';
import { CreateAttachmentcategoryDto } from './dto/create-attachmentcategory.dto';
import { UpdateAttachmentcategoryDto } from './dto/update-attachmentcategory.dto';

@Controller('attachmentcategory')
export class AttachmentcategoryController {
  constructor(private readonly attachmentcategoryService: AttachmentcategoryService) {}

  @Post()
  create(@Body() createAttachmentcategoryDto: CreateAttachmentcategoryDto) {
    return this.attachmentcategoryService.create(createAttachmentcategoryDto);
  }

  @Get()
  findAll() {
    return this.attachmentcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentcategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachmentcategoryDto: UpdateAttachmentcategoryDto) {
    return this.attachmentcategoryService.update(+id, updateAttachmentcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentcategoryService.remove(+id);
  }
}
