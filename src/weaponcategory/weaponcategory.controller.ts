import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeaponcategoryService } from './weaponcategory.service';
import { CreateWeaponcategoryDto } from './dto/create-weaponcategory.dto';
import { UpdateWeaponcategoryDto } from './dto/update-weaponcategory.dto';

@Controller('weaponcategory')
export class WeaponcategoryController {
  constructor(private readonly weaponcategoryService: WeaponcategoryService) {}

  @Post()
create(@Body() createWeaponcategoryDto: CreateWeaponcategoryDto | CreateWeaponcategoryDto[]) {
  if (Array.isArray(createWeaponcategoryDto)) {
    return this.weaponcategoryService.bulkCreate(createWeaponcategoryDto);
  }
  return this.weaponcategoryService.create(createWeaponcategoryDto);
}
  @Get()
  findAll() {
    return this.weaponcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weaponcategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeaponcategoryDto: UpdateWeaponcategoryDto) {
    return this.weaponcategoryService.update(+id, updateWeaponcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaponcategoryService.remove(+id);
  }
}
