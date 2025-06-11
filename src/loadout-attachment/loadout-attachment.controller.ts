import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoadoutAttachmentService } from './loadout-attachment.service';
import { CreateLoadoutAttachmentDto } from './dto/create-loadout-attachment.dto';
import { UpdateLoadoutAttachmentDto } from './dto/update-loadout-attachment.dto';

@Controller('loadout-attachment')
export class LoadoutAttachmentController {
  constructor(private readonly loadoutAttachmentService: LoadoutAttachmentService) {}

  @Post()
  create(@Body() createLoadoutAttachmentDto: CreateLoadoutAttachmentDto) {
    return this.loadoutAttachmentService.create(createLoadoutAttachmentDto);
  }

  @Get()
  findAll() {
    return this.loadoutAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loadoutAttachmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoadoutAttachmentDto: UpdateLoadoutAttachmentDto) {
    return this.loadoutAttachmentService.update(+id, updateLoadoutAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loadoutAttachmentService.remove(+id);
  }
}
