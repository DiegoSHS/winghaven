import { Module } from '@nestjs/common';
import { PuppeteerService } from 'src/features/scrapper/puppeteer/puppeteer.service';

@Module({
    providers: [PuppeteerService],
    exports: [PuppeteerService],
})
export class PuppeteerModule { }
