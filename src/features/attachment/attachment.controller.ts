import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { customIdPipe } from 'src/common/validation';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) { }

  @Post()
  create(
    @Body('data') createAttachmentDto: CreateAttachmentDto | CreateAttachmentDto[],
    @Body('gameId', customIdPipe) gameId?: number,
  ) {
    if (Array.isArray(createAttachmentDto)) {
      return this.attachmentService.bulkCreate(createAttachmentDto, gameId);
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
  @Get('search')
  search(@Query('name') name) {
    return this.attachmentService.findByName(name);
  }
  @Patch(':id')
  update(@Param('id', customIdPipe) id: number, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return this.attachmentService.update(id, updateAttachmentDto);
  }
  @Put()
  updateBulk(
    @Body('data') updateAttachmentDto: UpdateAttachmentDto,
    @Body('updateIds') updateIds: number[],
  ) {
    return this.attachmentService.updateMany(updateAttachmentDto, updateIds);
  }
  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.attachmentService.remove(id);
  }
}
