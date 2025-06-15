import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoadoutService } from './loadout.service';
import { CreateLoadoutDto } from './dto/create-loadout.dto';
import { UpdateLoadoutDto } from './dto/update-loadout.dto';
import { customIdPipe } from 'src/common/validation';

@Controller('loadout')
export class LoadoutController {
  constructor(
    private readonly loadoutService: LoadoutService
  ) { }

  @Post()
  create(@Body() createLoadoutDto: CreateLoadoutDto) {
    return this.loadoutService.create(createLoadoutDto);
  }

  @Get()
  findAll(
    @Param('id', customIdPipe) id?: number,
  ) {
    if (id) {
      return this.loadoutService.findOne(id);
    }
    return this.loadoutService.findAll();
  }

  @Patch(':id')
  update(@Param('id', customIdPipe) id: number, @Body() updateLoadoutDto: UpdateLoadoutDto) {
    return this.loadoutService.update(id, updateLoadoutDto);
  }

  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.loadoutService.remove(id);
  }
}
