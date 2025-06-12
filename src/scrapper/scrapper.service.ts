import { Injectable, Query } from '@nestjs/common';
import { CreateScrapperDto } from './dto/create-scrapper.dto';
import { UpdateScrapperDto } from './dto/update-scrapper.dto';
import { PuppeteerService } from 'src/puppeteer.service';

@Injectable()
export class ScrapperService {
  constructor(
    private readonly puppeteerService: PuppeteerService,
  ) { }

  create(createScrapperDto: CreateScrapperDto) {
    return this.puppeteerService.scrap(createScrapperDto.url);
  }

  findAll(@Query('filename') filename: string) {
    return this.puppeteerService.clean(filename)
  }

  findOne(id: number) {
    return `This action returns a #${id} scrapper`;
  }

  update(id: number, updateScrapperDto: UpdateScrapperDto) {
    return `This action updates a #${id} scrapper`;
  }

  remove(id: number) {
    return `This action removes a #${id} scrapper`;
  }
}
