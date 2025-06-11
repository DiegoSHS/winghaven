import { Controller, Get, Post, Param, Delete, Req, Put } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MultipartFile } from '@fastify/multipart';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }
  @Post()
  async create(@Req() req: { file: () => Promise<MultipartFile> }) {
    const file = await req.file();
    return this.cloudinaryService.create(file)
  }
  @Get()
  findAll() {
    return this.cloudinaryService.findAll();
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
