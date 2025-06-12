import { Module } from '@nestjs/common';
import { TesseractService } from './tesseract.service';

@Module({
  providers: [TesseractService],
})
export class TesseractModule { }
