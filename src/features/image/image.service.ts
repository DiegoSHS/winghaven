import { MultipartFile } from "@fastify/multipart";
import { TesseractService } from "src/features/image/tesseract/tesseract.service";
import { SharpService } from "src/features/image/sharp/sharp.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { extractBuffer } from "src/utils";
import { PrismaService } from "src/prisma.service";
import { FuseMode, FuseService } from "./textmatch/fuse.service";
import { Attachment, AttachmentCategory, Weapon } from "generated/prisma";

interface AttachmentInfo {
  attachmentCategory: string;
  attachmentName: string;
}

@Injectable()
export class ImageService {
  constructor(
    private readonly tesseract: TesseractService,
    private readonly sharp: SharpService,
    private readonly prisma: PrismaService,
    private readonly fuse: FuseService
  ) { }
  async recognize(file: MultipartFile) {
    const { error, buffer } = await extractBuffer(file)
    if (error) throw new InternalServerErrorException(error);
    const text = await this.tesseract.recognize(buffer);
    return text
  }
  async recognizeArea(file?: MultipartFile) {
    const { error, buffer } = await extractBuffer(file)
    if (error) throw new InternalServerErrorException(error)
    const croppedImage = await this.sharp.crop(buffer, {
      left: 1300, top: 79, width: 200, height: 30
    })
    const { data: { text } } = await this.tesseract.recognize(croppedImage)
    return this.tesseract.clear(text)
  }
  async cropAndRecognize(file?: MultipartFile) {
    console.log('Cropping and recognizing attachments from image...')
    const width = 250, height = 70;
    const cropAreasInfo = [
      { name: 'Optic', area: { left: 1100, top: 215, width: 190, height } },
      { name: 'Muzzle', area: { left: 60, top: 572, width, height } },
      { name: 'Barrel', area: { left: 280, top: 355, width: 290, height } },
      { name: 'Underbarrel', area: { left: 262, top: 734, width, height } },
      { name: 'Stock', area: { left: 1500, top: 355, width, height } },
      { name: 'Magazine', area: { left: 840, top: 915, width, height } },
      { name: 'Rear Grip', area: { left: 1467, top: 845, width, height } },
      { name: 'Fire Mods', area: { left: 1180, top: 915, width: 250, height: height } },
      { name: 'Laser', area: { left: 684, top: 215, width, height } },
      { name: 'Ammunition', area: { left: 523, top: 845, width, height } },
      { name: 'Aftermarket Parts', area: { left: 60, top: 215, width, height } },
      { name: 'Comb', area: { left: 1585, top: 734, width, height } }
    ]
    console.log('Setting crop zones')
    const cropZones = cropAreasInfo.map(({ area }) => area);
    const { error, buffer } = await extractBuffer(file)
    if (error) throw new InternalServerErrorException(error)
    console.log('Cropping multiple zones from image...')
    const croppedImages = await this.sharp.cropMultipleZones(buffer, cropZones);
    console.log('Recognizing text from cropped images...')
    const recognizedTexts = await this.tesseract.recognizeMultiple(croppedImages)
    console.log('Processing recognized texts...')
    return recognizedTexts.map(({ data }, index) => {
      const text = this.tesseract.clear(data.text)
        .split(' ')
        .filter(word => word.match("^[A-z]+$"))
        .filter(word => word.length > 3)
        .filter(word => word === word.toUpperCase())
        .join(' ')
      return {
        attachmentName: text,
        attachmentCategory: cropAreasInfo[index].name
      }
    })
  }
  getWeaponInfo(text: string) {
    const noNumbersInfo = text.trim();
    const splittedInfo = noNumbersInfo.split(' ')
    if (splittedInfo.length === 0) return
    if (splittedInfo.length === 1) return {
      weaponName: splittedInfo[0].trim(),
      weaponCategoryName: ''
    }
    if (splittedInfo.length === 2) return {
      weaponName: splittedInfo[0].trim(),
      weaponCategoryName: splittedInfo[1].trim()
    }
    if (splittedInfo.length === 3) return {
      weaponName: splittedInfo[0].trim(),
      weaponCategoryName: splittedInfo.slice(-2).join(' ').trim()
    }
    if (splittedInfo.length === 4) return {
      weaponName: splittedInfo.slice(0, 2).join(' ').trim(),
      weaponCategoryName: splittedInfo.slice(-2).join(' ').trim()
    }
    if (splittedInfo.length === 5) return {
      weaponName: splittedInfo.slice(0, 3).join(' ').trim(),
      weaponCategoryName: splittedInfo.slice(-2).join(' ').trim()
    }
  }
  async recognizeAttachment(weaponAttachment: string) {
    const attachment = this.prisma.attachment.findFirst({
      where: {
        name: {
          contains: weaponAttachment.toLowerCase().trim(),
          mode: "insensitive"
        }
      }
    })
    return attachment
  }
  async recognizeAttachments(attachments: string[]) {
    return Promise.all(attachments.map(attachment => this.recognizeAttachment(attachment)))
  }
  recognizeFuzzyFirst<T>(text: string, items: T[]) {
    this.fuse.setCollection<T>(items);
    const result = this.fuse.match<T>(text, "first");
    return result as T
  }
  recognizeFuzzyAll<T>(text: string, items: T[]) {
    this.fuse.setCollection<T>(items);
    const result = this.fuse.match<T>(text, "all");
    return result as T[]
  }
}