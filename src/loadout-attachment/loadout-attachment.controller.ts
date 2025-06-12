import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LoadoutAttachmentService } from './loadout-attachment.service';
import { CreateLoadoutAttachmentDto } from './dto/create-loadout-attachment.dto';
import { UpdateLoadoutAttachmentDto } from './dto/update-loadout-attachment.dto';
import { customIdPipe } from 'src/common/validation';

@Controller('loadout-attachment')
export class LoadoutAttachmentController {
  constructor(private readonly loadoutAttachmentService: LoadoutAttachmentService) { }

  @Post()
  create(@Body() createLoadoutAttachmentDto: CreateLoadoutAttachmentDto) {
    return this.loadoutAttachmentService.create(createLoadoutAttachmentDto);
  }

  @Get()
  findAll(
    @Query('loadoutId', customIdPipe) loadoutId?: number,
    @Query('attachmentId', customIdPipe) attachmentId?: number
  ) {
    if (loadoutId && attachmentId) {
      return this.loadoutAttachmentService.findOne(loadoutId, attachmentId);
    }
    if (loadoutId) {
      return this.loadoutAttachmentService.findByLoadoutId(loadoutId);
    }
    if (attachmentId) {
      return this.loadoutAttachmentService.findByAttachmentId(attachmentId);
    }
    return this.loadoutAttachmentService.findAll();
  }

  @Patch()
  update(
    @Body() updateLoadoutAttachmentDto: UpdateLoadoutAttachmentDto,
    @Query('loadoutId', customIdPipe) loadoutId?: number,
    @Query('attachmentId', customIdPipe) attachmentId?: number,
  ) {
    return this.loadoutAttachmentService.update(loadoutId, attachmentId, updateLoadoutAttachmentDto);
  }

  @Delete()
  remove(
    @Query('loadoutId', customIdPipe) loadoutId?: number,
    @Query('attachmentId', customIdPipe) attachmentId?: number,
  ) {
    return this.loadoutAttachmentService.remove(loadoutId, attachmentId);
  }
}
