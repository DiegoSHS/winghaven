import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { createWorker, ImageLike, Worker } from 'tesseract.js';

@Injectable()
export class TesseractService implements OnModuleInit {
  private worker: Worker;
  async onModuleInit() {
    this.worker = await createWorker();
  }
  recognize(image: ImageLike) {
    try {
      return this.worker.recognize(image)
    } catch (error) {
      throw new InternalServerErrorException("Error recognizing text");
    }
  }
  recognizeMultiple(images: ImageLike[]) {
    return Promise.all(images.map((image) => {
      return this.recognize(image)
    }))
  }
  clear(text: string) {
    return text.split('\n')
      .join(' ')
      .trim()
  }
}
