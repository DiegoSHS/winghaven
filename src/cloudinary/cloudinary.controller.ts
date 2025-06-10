import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
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
  findOne(@Param('id') id: string) {
    return this.cloudinaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCloudinaryDto: UpdateCloudinaryDto) {
    return this.cloudinaryService.update(+id, updateCloudinaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloudinaryService.remove(+id);
  }
}
