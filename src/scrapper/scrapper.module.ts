import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';
import { PuppeteerService } from 'src/puppeteer.service';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService, PuppeteerService],
  imports: []
})
export class ScrapperModule { }
