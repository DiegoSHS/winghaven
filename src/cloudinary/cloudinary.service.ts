import { Injectable } from '@nestjs/common';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
import { AdminAndResourceOptions, ResourceApiResponse, ResponseCallback, UploadApiOptions, UploadResponseCallback, v2 } from 'cloudinary';


@Injectable()
export class CloudinaryService {
  private uploadImage(buffer: Buffer) {
    return new Promise((resolve, reject) => {
      const options: UploadApiOptions = { folder: 'wing' }
      const callback: UploadResponseCallback = (err, result) => {
        if (err) reject(err.message)
        resolve(result)
      }
      v2.uploader
        .upload_stream(options, callback)
        .end(buffer)
    })
  }
  private getResources() {
    return new Promise((resolve, reject) => {
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
  create(createCloudinaryDto: CreateCloudinaryDto) {
    return 'This action adds a new cloudinary';
  }

  findAll() {
    return this.getResources()
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
