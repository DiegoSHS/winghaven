import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';
import { PuppeteerModule } from 'src/features/scrapper/puppeteer/puppeteer.module';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService],
  imports: [PuppeteerModule]
})
export class ScrapperModule { }
