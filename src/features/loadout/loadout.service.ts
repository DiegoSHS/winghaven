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
import { AttachmentCategoryService } from '../attachment-category/attachment-category.service';

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
    private readonly attachmentCategory: AttachmentCategoryService,
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

  private async processAttachment(text: string, fuzzyList: Attachment[]) {
    const attachment = await this.attachment.findByName(text);
    if (!attachment) return this.processAttachmentFuzzy(text, fuzzyList);
    return attachment;
  }
  async processLoadout(file: MultipartFile) {
    const weaponAttachments = await this.image.cropAndRecognize(file);
    const weaponInfo = await this.image.recognizeArea(file);
    const { weaponName, weaponCategoryName } = this.image.getWeaponInfo(weaponInfo);
    const weaponCategory = await this.processWeaponCategory(weaponCategoryName);
    const weapon = await this.processWeapon(weaponName);
    const attachmentsList = await this.attachment.findAll()
    const attachmentCategoryPromises = weaponAttachments.map(({ attachmentCategory }) => {
      return this.attachmentCategory.findByName(attachmentCategory);
    })
    const attachmentCategories = await Promise.all(attachmentCategoryPromises);
    const attachmentsPromises = weaponAttachments.map(({ attachmentName }) => {
      if (attachmentName.length === 0) return null;
      return this.processAttachment(attachmentName, attachmentsList)
    })
    const attachmentResults = await Promise.all(attachmentsPromises);
    const results = attachmentCategories.map((category, index) => {
      return {
        category,
        attachment: attachmentResults[index],
      };
    })
    const attachments = results.filter((item) => item?.attachment);
    console.log('Attachments found:', attachments);
    return {
      weapon,
      weaponCategory,
      attachments
    }
  }
}
