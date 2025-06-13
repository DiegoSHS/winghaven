import { Controller, Get, Post, Query } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) { }

  @Post()
  async create(@Query('url') url: string) {
    return await this.scrapperService.create(url);
  }

  @Get('/clean')
  findAll(@Query('filename') filename: string) {
    return this.scrapperService.findAll(filename);
  }
}
