import { Module } from '@nestjs/common';
import { SharpService } from 'src/features/image/sharp/sharp.service';
import { TesseractService } from 'src/features/image/tesseract/tesseract.service';
import { ImageService } from './image.service';

@Module({
  providers: [ImageService, SharpService, TesseractService],
  exports: [ImageService, SharpService, TesseractService]
})
export class ImageModule { }
