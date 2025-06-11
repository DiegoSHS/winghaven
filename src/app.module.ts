import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeaponModule } from './weapon/weapon.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AttachmentModule } from './attachment/attachment.module';
import { WeaponcategoryModule } from './weaponcategory/weaponcategory.module';
import { WeaponattachmentModule } from './weaponattachment/weaponattachment.module';
import { AttachmentcategoryModule } from './attachmentcategory/attachmentcategory.module';
import { LoadoutModule } from './loadout/loadout.module';
import { LoadoutattachmentModule } from './loadoutattachment/loadoutattachment.module';

@Module({
  imports: [ConfigModule.forRoot(), WeaponModule, ScrapperModule, CloudinaryModule, AttachmentModule, WeaponcategoryModule, WeaponattachmentModule, AttachmentcategoryModule, LoadoutModule, LoadoutattachmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule { }
