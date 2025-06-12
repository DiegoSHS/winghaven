import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { customIdPipe } from 'src/common/validation';

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
    @Query('id', customIdPipe) id?: number,
  ) {
    if (id) {
      return this.attachmentService.findOne(id);
    }
    return this.attachmentService.findAll();
  }

  @Patch(':id')
  update(@Param('id', customIdPipe) id: number, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return this.attachmentService.update(id, updateAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.attachmentService.remove(id);
  }
}
