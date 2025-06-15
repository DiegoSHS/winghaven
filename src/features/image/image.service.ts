import { MultipartFile } from "@fastify/multipart";
import { TesseractService } from "src/features/image/tesseract/tesseract.service";
import { SharpService } from "src/features/image/sharp/sharp.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { extractBuffer } from "src/utils";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { PrismaService } from "src/prisma.service";

interface AttachmentInfo {
  attachmentCategory: string;
  attachmentName: string;
}

@Injectable()
export class ImageService {
  constructor(
    private readonly cloudinary: CloudinaryService,
    private readonly tesseract: TesseractService,
    private readonly sharp: SharpService,
    private readonly prisma: PrismaService,
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
    const { error, buffer } = await extractBuffer(file)
    if (error) throw new InternalServerErrorException(error)
    const croppedImages = await this.sharp.cropMultipleZones(buffer, [
      { left: 60, top: 200, width: 180, height: 100 },
      { left: 680, top: 200, width: 180, height: 100 },
      { left: 1100, top: 200, width: 180, height: 100 },
      { left: 60, top: 560, width: 180, height: 100 },
      { left: 260, top: 720, width: 180, height: 100 },
      { left: 840, top: 900, width: 180, height: 100 },
      { left: 1180, top: 900, width: 180, height: 100 },
      { left: 1470, top: 840, width: 180, height: 100 },
      { left: 1506, top: 340, width: 180, height: 100 },
    ]);
    const recognizedTexts = await this.tesseract.recognizeMultiple(croppedImages)
    return recognizedTexts.map(({ data }) => this.tesseract.clear(data.text))
  }
  getWeaponInfo(text: string) {
    const noNumbersInfo = text.replace(/\d+/g, '').trim();
    const splittedInfo = noNumbersInfo.split(' ')
    const weaponName = splittedInfo.at(0).trim();
    const sliceIndex = splittedInfo.length < 3 ? -1 : -2;
    const weaponCategoryName = splittedInfo.slice(sliceIndex).join(' ').trim();
    return {
      weaponName,
      weaponCategoryName
    }
  }
  getWeaponAttachments(detectedTexts: string[]) {
    return detectedTexts.map(text => {
      return text
        .split(' ')
        .filter(word => word.match("^[A-z]+$"))
        .filter(word => word.length > 3)
    })
      .map(words => {
        if (words.length === 0) return
        if (words.length < 2) return
        return {
          attachmentCategory: words.filter(word => word !== word.toUpperCase()).join(' '),
          attachmentName: words.filter(word => word === word.toUpperCase()).join(' ')
        }
      })
      .filter(item => item)
  }
  async recognizeAttachments(weaponCategoryName: string, weaponName: string, attachmentList: AttachmentInfo[]) {
    const weaponCategory = await this.prisma.weaponCategory.findFirst({
      where: { name: { contains: weaponCategoryName, mode: 'insensitive' } }
    })
    const weapon = await this.prisma.weapon.findFirst({
      where: {
        name: { contains: weaponName, mode: 'insensitive' },
        weaponCategoryId: weaponCategory.id ? weaponCategory.id : undefined
      }
    })
    const attachmentOptions = attachmentList.map(item => {
      return this.prisma.attachmentCategory.findFirst({
        where: {
          name: {
            contains: item.attachmentCategory.toLowerCase(),
            mode: 'insensitive'
          }
        }, include: {
          attachment: {
            where: {
              name: {
                contains: item.attachmentName.toLowerCase(),
                mode: 'insensitive'
              },
              gameId: weapon ? weapon.gameId : undefined
            }
          }
        }
      })
    })
    const attachmentsResult = await Promise.all(attachmentOptions);
    const attachments = attachmentsResult.filter(item => item && item.attachment.length > 0)
    return {
      weapon,
      weaponCategory,
      attachments
    }
  }
  async processLoadout(file: MultipartFile) {
    const texts = await this.cropAndRecognize(file);
    const weaponInfo = await this.recognizeArea(file);
    const { weaponName, weaponCategoryName } = this.getWeaponInfo(weaponInfo);
    const attachmentList = this.getWeaponAttachments(texts);
    const { weaponCategory, weapon, attachments } = await this.recognizeAttachments(weaponCategoryName, weaponName, attachmentList);
    return {
      weapon,
      weaponCategory,
      attachments,
    }
  }
}