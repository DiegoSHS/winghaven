import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoadoutattachmentService } from './loadoutattachment.service';
import { CreateLoadoutattachmentDto } from './dto/create-loadoutattachment.dto';
import { UpdateLoadoutattachmentDto } from './dto/update-loadoutattachment.dto';

@Controller('loadoutattachment')
export class LoadoutattachmentController {
  constructor(private readonly loadoutattachmentService: LoadoutattachmentService) {}

  @Post()
  create(@Body() createLoadoutattachmentDto: CreateLoadoutattachmentDto) {
    return this.loadoutattachmentService.create(createLoadoutattachmentDto);
  }

  @Get()
  findAll() {
    return this.loadoutattachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loadoutattachmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoadoutattachmentDto: UpdateLoadoutattachmentDto) {
    return this.loadoutattachmentService.update(+id, updateLoadoutattachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loadoutattachmentService.remove(+id);
  }
}
