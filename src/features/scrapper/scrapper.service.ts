import { Injectable, Query } from '@nestjs/common';
import { PuppeteerService } from 'src/features/scrapper/puppeteer/puppeteer.service';

@Injectable()
export class ScrapperService {
  constructor(
    private readonly puppeteerService: PuppeteerService,
  ) { }

  create(url: string) {
    return this.puppeteerService.scrap(url);
  }

  findAll(@Query('filename') filename: string) {
    return this.puppeteerService.clean(filename)
  }
}
