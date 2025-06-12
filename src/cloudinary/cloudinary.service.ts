import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminAndResourceOptions, DeleteApiResponse, ResourceApiResponse, ResponseCallback, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse, UploadResponseCallback, v2 } from 'cloudinary';
import { MultipartFile } from '@fastify/multipart';
import { extractBuffer } from 'src/utils';

@Injectable()
export class CloudinaryService {

  private uploadOptions: UploadApiOptions = {
    folder: 'wing',
    resource_type: 'image',
  }
  private adminOptions: AdminAndResourceOptions = {
    type: 'upload',
    prefix: 'wing/',
    resource_type: 'image',
    max_results: 30,
    fields: ['public_id', 'secure_url'],
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
      const callback: ResponseCallback = (err, result: ResourceApiResponse) => {
        if (err) reject(err)
        resolve(result)
      }
      v2.api
        .resources(this.adminOptions, callback)
    })
  }
  private getResource(public_id: string) {
    return new Promise((
      resolve: (result: ResourceApiResponse) => void,
      reject
    ) => {
      const callback: ResponseCallback = (err, result: ResourceApiResponse) => {
        if (err) reject(err)
        resolve(result)
      }
      v2.api.resource(public_id, this.adminOptions, callback)
    })
  }
  public updateImage(public_id: string, buffer: Buffer) {
    return new Promise((
      resolve: (result: UploadApiResponse) => void,
      reject
    ) => {
      const callback: ResponseCallback = (err, result: UploadApiResponse) => {
        if (err) reject(err)
        resolve(result)
      }
      v2.uploader
        .upload_stream({
          public_id,
          overwrite: true,
          folder: 'wing',
          resource_type: 'image'
        }, callback)
        .end(buffer)
    })
  }
  public deleteImage(public_id: string) {
    return new Promise((
      resolve: (result: DeleteApiResponse) => void,
      reject
    ) => {
      const callback: ResponseCallback = (err, result: DeleteApiResponse) => {
        if (err) reject(err)
        resolve(result)
      }
      v2.api.delete_resources([public_id], callback)
    })
  }
  async create(file: MultipartFile) {
    const { error, buffer } = await extractBuffer(file)
    if (error) throw new BadRequestException(error);
    const uploadResult = await this.uploadImage(buffer)
    return {
      error: null as string,
      data: uploadResult,
      message: 'Image uploaded successfully',
    }
  }

  async findAll() {
    const data = await this.getResources()
    return {
      error: null,
      data,
      message: 'Resources fetched successfully',
    }
  }

  findOne(public_id: string) {
    const data = this.getResource(public_id)
    return {
      error: null,
      data,
      message: 'Resource fetched successfully',
    }
  }

  async update(public_id: string, file: MultipartFile) {
    const { error, buffer } = await extractBuffer(file)
    if (error) throw new BadRequestException(error);
    const updateResult = await this.updateImage(public_id, buffer)
    return {
      data: updateResult,
      error: null,
      message: 'Image updated successfully',
    }
  }

  async remove(public_id: string) {
    const data = await this.deleteImage(public_id)
    return {
      error: null,
      data,
      message: 'Image deleted successfully',
    }
  }
}
