import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { CreateScrapperDto } from './dto/create-scrapper.dto';
import { UpdateScrapperDto } from './dto/update-scrapper.dto';

@Controller('scrapper')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) { }

  @Post()
  async create(@Body() createScrapperDto: CreateScrapperDto) {
    return await this.scrapperService.create(createScrapperDto);
  }

  @Get()
  findAll() {
    return this.scrapperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapperService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScrapperDto: UpdateScrapperDto) {
    return this.scrapperService.update(+id, updateScrapperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scrapperService.remove(+id);
  }
}
