import { Controller, Get, Post, Param, Delete, Req, Put } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MultipartFile } from '@fastify/multipart';
import { createWorker, OEM } from "tesseract.js";

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }
  @Post()
  async create(@Req() req: { file: () => Promise<MultipartFile> }) {
    console.log('Creating a new image in Cloudinary...');
    console.log('Initializing Tesseract.js worker...');
    const worker = await createWorker('eng', OEM.DEFAULT, {
      logger: info => {
        if ('progress' in info) {
          console.log(`Progress: ${info.progress == 1 ? 'Done' : info.progress}`);
        }
        console.log(`Status: ${info.status}`);
      }
    })
    console.log('Worker initialized successfully.');
    console.log('Loading Tesseract.js worker...');
    await worker.load();
    console.log('Worker loaded successfully.');
    const file = await req.file();
    const result = await this.cloudinaryService.create(file)
    const url = result.data.secure_url
    console.log('Recognizing text from image URL:', url);
    const text = await worker.recognize(url);
    console.log('Extracted text:', text);
    await worker.terminate()
    return result;
  }
  @Get()
  findAll() {
    return this.cloudinaryService.findAll();
  }

  @Get('recognize/')
  async recognize(@Req() req: { file: () => Promise<MultipartFile> }) {
    console.log('Initializing Tesseract.js worker for text recognition...');
    const worker = await createWorker('eng', OEM.DEFAULT, {
      logger: info => {
        if ('progress' in info) {
          console.log(`Progress: ${info.progress == 1 ? 'Done' : info.progress}`);
        }
        console.log(`Status: ${info.status}`);
      }
    });
    console.log('Worker initialized successfully.');
    console.log('Recognizing text from image test image');
    const text = await worker.recognize('/test.png');
    console.log('Extracted text:', text);
    await worker.terminate();
    return { text: text.data.text };
  }

  @Get(':id')
  findOne(@Param('id') public_id: string) {
    return this.cloudinaryService.findOne(public_id);
  }

  @Put(':id')
  async update(@Req() req: { file: () => Promise<MultipartFile> }, @Param('id') public_id: string) {
    const file = await req.file();

    return this.cloudinaryService.update(public_id, file);
  }

  @Delete(':id')
  remove(@Param('id') public_id: string) {
    return this.cloudinaryService.remove(public_id);
  }
}
