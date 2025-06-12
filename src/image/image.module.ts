import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { SharpService } from 'src/sharp/sharp.service';
import { TesseractService } from 'src/tesseract/tesseract.service';

@Module({
  providers: [ImageService, SharpService, TesseractService],
  exports: [ImageService, SharpService, TesseractService]
})
export class ImageModule { }
