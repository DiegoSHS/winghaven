import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { SharpService } from 'src/sharp/sharp.service';
import { TesseractService } from 'src/tesseract/tesseract.service';
import { ImageService } from 'src/image/image.service';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService, SharpService, TesseractService, ImageService],
  exports: [CloudinaryProvider, CloudinaryService, SharpService, TesseractService],
})
export class CloudinaryModule { }
