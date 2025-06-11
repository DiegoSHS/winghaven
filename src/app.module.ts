import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeaponModule } from './weapon/weapon.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AttachmentModule } from './attachment/attachment.module';
import { LoadoutModule } from './loadout/loadout.module';
import { LoadoutAttachmentModule } from './loadout-attachment/loadout-attachment.module';
import { AttachmentCategoryModule } from './attachment-category/attachment-category.module';
import { WeaponAttachmentModule } from './weapon-attachment/weapon-attachment.module';
import { WeaponCategoryModule } from './weapon-category/weapon-category.module';

@Module({
  imports: [ConfigModule.forRoot(), WeaponModule, ScrapperModule, CloudinaryModule, AttachmentModule, LoadoutModule, LoadoutAttachmentModule, AttachmentCategoryModule, WeaponAttachmentModule, WeaponCategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule { }
