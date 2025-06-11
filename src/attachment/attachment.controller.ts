import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) { }

  @Post()
  create(@Body() createAttachmentDto: CreateAttachmentDto | CreateAttachmentDto[]) {
    if (Array.isArray(createAttachmentDto)) {
      return this.attachmentService.bulkCreate(createAttachmentDto);
    }
    return this.attachmentService.create(createAttachmentDto);
  }

  @Get()
  findAll(
    @Query('id', ParseIntPipe) id?: number,
  ) {
    if (id) {
      return this.attachmentService.findOne(id);
    }
    return this.attachmentService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return this.attachmentService.update(id, updateAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.attachmentService.remove(id);
  }
}
