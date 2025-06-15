import { Module } from '@nestjs/common';
import { SharpService } from 'src/features/image/sharp/sharp.service';
import { TesseractService } from 'src/features/image/tesseract/tesseract.service';
import { ImageService } from './image.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  providers: [ImageService, SharpService, TesseractService, CloudinaryService],
  exports: [ImageService, SharpService, TesseractService, CloudinaryService]
})
export class ImageModule { }
