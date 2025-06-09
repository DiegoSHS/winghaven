import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';

export async function ExtractBuffer(data) {
  try {
    console.log('Received file:', data)
    const bytes = await data.toBuffer()
    return Buffer.from(bytes)
  } catch (error) {
    return error
  }
}

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }

  @Post()
  create(@Req() req) {
    console.log(req.body);
    return {};
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
