import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoadoutService } from './loadout.service';
import { CreateLoadoutDto } from './dto/create-loadout.dto';
import { UpdateLoadoutDto } from './dto/update-loadout.dto';

@Controller('loadout')
export class LoadoutController {
  constructor(private readonly loadoutService: LoadoutService) {}

  @Post()
  create(@Body() createLoadoutDto: CreateLoadoutDto) {
    return this.loadoutService.create(createLoadoutDto);
  }

  @Get()
  findAll() {
    return this.loadoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loadoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoadoutDto: UpdateLoadoutDto) {
    return this.loadoutService.update(+id, updateLoadoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loadoutService.remove(+id);
  }
}
