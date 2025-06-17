import { Injectable } from '@nestjs/common';
import { CreateLoadoutDto } from './dto/create-loadout.dto';
import { UpdateLoadoutDto } from './dto/update-loadout.dto';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from '../image/image.service';
import { MultipartFile } from '@fastify/multipart';
import { AttachmentService } from '../attachment/attachment.service';
import { WeaponCategoryService } from '../weapon-category/weapon-category.service';
import { WeaponService } from '../weapon/weapon.service';
import { Attachment } from 'generated/prisma';

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

@Injectable()
export class LoadoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly image: ImageService,
    private readonly weaponCategory: WeaponCategoryService,
    private readonly attachment: AttachmentService,
    private readonly weapon: WeaponService,
  ) { }
  async create(createLoadoutDto: CreateLoadoutDto) {
    const result = await this.prisma.loadout.create({
      data: createLoadoutDto,
    })
    return result
  }

  async findAll() {
    const result = await this.prisma.loadout.findMany({
      include: {
        loadoutAttachment: {
          include: {
            attachment: true,
          },
        }
      },
    })
    return result;
  }

  findOne(id: number) {
    const result = this.prisma.loadout.findUnique({
      where: {
        id: id,
      },
      include: {
        loadoutAttachment: {
          include: {
            attachment: true,
          },
        }
      },
    })
    return result
  }

  update(id: number, updateLoadoutDto: UpdateLoadoutDto) {
    const result = this.prisma.loadout.update({
      where: {
        id: id,
      },
      data: updateLoadoutDto,
    })
    return result
  }

  remove(id: number) {
    const result = this.prisma.loadout.delete({
      where: {
        id: id,
      }
    })
    return result;
  }

  private async processWeaponFuzzy(text: string) {
    console.log('Searching for weapon:', text);
    const weapons = await this.weapon.findAll()
    const result = await this.image.recognizeFuzzyFirst(text, weapons);
    console.log('Weapon found:', result);
    return result;
  }

  private async processWeaponCategoryFuzzy(text: string) {
    console.log('Searching for weapon category:', text);
    const categories = await this.weaponCategory.findAll()
    const result = await this.image.recognizeFuzzyFirst(text, categories);
    console.log('Weapon category found:', result);
    return result;
  }

  private async processAttachmentFuzzy(text: string, attachments: Attachment[]) {
    const result = await this.image.recognizeFuzzyFirst(text, attachments);
    return result;
  }

  private async processAttachmentsFuzzy(texts: string[], attachments: Attachment[]) {
    const promises = texts.map(text => this.processAttachmentFuzzy(text, attachments))
    const results = await Promise.all(promises);
    return results
  }

  async processLoadoutFuzzy(file: MultipartFile) {
    const weaponAttachments = await this.image.cropAndRecognize(file);
    const weaponInfo = await this.image.recognizeArea(file);
    const { weaponName, weaponCategoryName } = this.image.getWeaponInfo(weaponInfo);
    const weaponCategory = await this.processWeaponCategoryFuzzy(weaponCategoryName)
    const weapon = await this.processWeaponFuzzy(weaponName);
    const attachmentList = await this.attachment.findAll()
    const attachmentsPromises = weaponAttachments.map(({ attachmentName }) => {
      if (attachmentName.length === 0) return null;
      return this.processAttachmentFuzzy(attachmentName, attachmentList)
    })
    const attachmentsResults = await Promise.all(attachmentsPromises);
    const attachmentsObject = weaponAttachments.map(({ attachmentCategory }, i) => {
      return {
        attachmentCategory,
        attachments: attachmentsResults[i]
      }
    })
    const attachments = attachmentsObject.filter(({ attachments }) => attachments !== null);
    console.log('Attachments found:', attachments);
    if (attachments.length === 0) return null;
    return {
      weapon,
      weaponCategory,
      attachments
    }
  }

  private async processWeaponCategory(text: string) {
    const weaponCategory = await this.weaponCategory.findByName(text);
    if (!weaponCategory) return this.processWeaponCategoryFuzzy(text);
    return weaponCategory;
  }

  private async processWeapon(text: string) {
    const weapon = await this.weapon.findByName(text);
    if (!weapon) return this.processWeaponFuzzy(text);
    return weapon;
  }

  private async processAttachment(text: string) {
    const attachment = await this.attachment.findByName(text);
    return attachment;
  }
  async processLoadout(file: MultipartFile) {
    const weaponAttachments = await this.image.cropAndRecognize(file);
    const weaponInfo = await this.image.recognizeArea(file);
    const { weaponName, weaponCategoryName } = this.image.getWeaponInfo(weaponInfo);
    const weaponCategory = await this.processWeaponCategory(weaponCategoryName);
    const weapon = await this.processWeapon(weaponName);
    const attachmentsPromises = weaponAttachments.map(({ attachmentName }) => {
      if (attachmentName.length === 0) return null;
      return this.processAttachment(attachmentName);
    })
    const attachmentsResults = await Promise.all(attachmentsPromises);
    const attachmentsObject = weaponAttachments.map(({ attachmentCategory }, i) => {
      return {
        attachmentCategory,
        attachments: attachmentsResults[i]
      }
    })
    const attachments = attachmentsObject.filter(({ attachments }) => attachments !== null);
    console.log('Attachments found:', attachments);
    return {
      weapon,
      weaponCategory,
      attachments
    }
  }
}
