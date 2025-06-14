import { Controller, Get, Post, Param, Delete, Req, Put } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MultipartFile } from '@fastify/multipart';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from '../image.service';

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
    const weaponInfo = await this.image.recognizeArea();
    console.log(weaponInfo)
    const weaponName = weaponInfo.split(' ')[0]
    console.log('Recognized weapon name:', weaponName);
    const weaponCategoryName = weaponInfo.split(' ').slice(1).join(' ')
    const weapon = await this.prisma.weapon.findFirst({
      where: { name: { contains: weaponName, mode: 'insensitive' } }
    })
    console.log('Weapon:', weapon);
    const weaponCategory = await this.prisma.weaponCategory.findFirst({
      where: { name: { contains: weaponCategoryName, mode: 'insensitive' } }
    })
    console.log('Weapon category:', weaponCategory);
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
    console.log(result)
    const attachmentOptions = result.map(item => {
      return this.prisma.attachmentCategory.findUnique({
        where: {
          name: item.attachmentCategory.toLowerCase()
        }, include: {
          attachment: {
            where: {
              name: {
                contains: item.attachmentName.toLowerCase(),
                mode: 'insensitive'
              },
            }
          }
        }
      })
    })
    const attachmentOptionsResults = await Promise.all(attachmentOptions);
    console.log('Attachment options:', attachmentOptionsResults);
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
