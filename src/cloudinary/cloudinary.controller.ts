import { Controller, Get, Post, Param, Delete, Req, Put } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MultipartFile } from '@fastify/multipart';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from '../image/image.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaService,
    private readonly image: ImageService
  ) { }
  @Post()
  async create(@Req() req: { file: () => Promise<MultipartFile> }) {
    console.log('Creating a new image in Cloudinary...');
    const file = await req.file();
    const result = await this.cloudinaryService.create(file)
    const url = result.data.secure_url
    console.log('Recognizing text from image URL:', url);
    return result;
  }
  @Get()
  findAll() {
    return this.cloudinaryService.findAll();
  }

  @Get('recognize/')
  async recognize() {
    console.log('Initializing Tesseract.js worker for text recognition...');
    const texts = await this.image.cropAndRecognize()
    const extractedTexts = texts.filter(text => text.length > 5);
    const result = extractedTexts.map(text => {
      return text
        .split(' ')
        .filter(word => word.match("^[A-z]+$"))
        .filter(word => word.length > 3)
    })
      .map(words => {
        if (words.length === 0) return
        if (words.length < 2) return
        return {
          attachmentCategory: words.pop(),
          attachmentName: words.join(' ')
        }
      })
      .filter((item) => item);
    const attachmentCatFilter = result.map(item => {
      return { name: { contains: item.attachmentCategory, mode: 'insensitive' } }
    });
    const attCat = await this.prisma.attachmentCategory.findMany({
      where: {
        OR: attachmentCatFilter as any[]
      }
    })
    const attachmentFilter = result.map(item => {
      return { name: { contains: item.attachmentName, mode: 'insensitive' } }
    });
    const attachments = await this.prisma.attachment.findMany({
      where: {
        OR: attachmentFilter as any[]
      }
    })
    console.log(attachments)
    console.log(attCat)
    console.log('Image processed successfully.');
    return { message: 'Text recognition completed successfully.' };
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
