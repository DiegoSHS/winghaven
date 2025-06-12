import { Injectable, InternalServerErrorException } from '@nestjs/common';
import sharp, { Region, SharpInput } from 'sharp';

@Injectable()
export class SharpService {
  crop(image: SharpInput, region: Region) {
    try {
      return sharp(image)
        .extract(region)
        .toFormat('png')
        .toBuffer()
    } catch (error) {
      throw new InternalServerErrorException('Error cropping image')
    }
  }

  cropMultipleZones(image: SharpInput, regions: Region[]) {
    return Promise.all(regions.map((region) => {
      return this.crop(image, region)
    }))
  }
}
