import { Injectable } from '@nestjs/common';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
import { AdminAndResourceOptions, ResourceApiResponse, ResponseCallback, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse, UploadResponseCallback, v2 } from 'cloudinary';
import { MultipartFile } from '@fastify/multipart';

@Injectable()
export class CloudinaryService {
  private uploadOptions: UploadApiOptions = {
    folder: 'wing',
  }
  private async extractBuffer(data: MultipartFile) {
    try {
      console.log('Extracting buffer from:', data.filename)
      const bytes = await data.toBuffer()
      if (!bytes || bytes.length === 0) {
        throw new Error('File is empty or not readable')
      }
      return {
        error: null,
        data: bytes,
      }
    } catch (error) {
      return {
        error: error.message || 'Unknown error occurred',
        data: Buffer.from([]),
      }
    }
  }
  private uploadImage(buffer: Buffer) {
    return new Promise((
      resolve: (value: UploadApiResponse) => void,
      reject: (value: UploadApiErrorResponse) => void
    ) => {
      const callback: UploadResponseCallback = (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
      v2.uploader
        .upload_stream(this.uploadOptions, callback)
        .end(buffer)
    })
  }
  private getResources() {
    return new Promise((
      resolve: (result: ResourceApiResponse) => void,
      reject
    ) => {
      const options: AdminAndResourceOptions = {
        type: 'upload',
        prefix: 'wing/',
        max_results: 30,
      }
      const callback: ResponseCallback = (err, result: ResourceApiResponse) => {
        if (err) reject(err)
        resolve(result)
      }
      v2.api
        .resources(options, callback)
    })
  }
  async create(file: MultipartFile) {
    const { error, data } = await this.extractBuffer(file)
    if (error) return {
      error,
      data: null,
      message: null
    }
    const uploadResult = await this.uploadImage(data)
    return {
      error: null,
      data: uploadResult,
      message: 'Image uploaded successfully',
    }
  }

  async findAll() {
    const result = await this.getResources()
    const data = result.resources.map((resource) => {
      return {
        id: resource.public_id,
        url: resource.secure_url
      }
    })
    return {
      error: null,
      data: data,
      message: 'Resources fetched successfully',
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cloudinary`;
  }

  update(id: number, updateCloudinaryDto: UpdateCloudinaryDto) {
    return `This action updates a #${id} cloudinary`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloudinary`;
  }
}
