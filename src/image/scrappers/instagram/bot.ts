/* eslint-disable no-var */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import config from 'config/config';
import { AppModule } from 'src/app.module';
import { Instagram } from './src/instagram';

export const instaBot = async (path: string) => {
  if (!process.env.PTBR_INSTA_USERNAME || !process.env.ENG_INSTA_USERNAME) {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    var pt_username = configService.get('instagram.pt_username');
    var pt_password = configService.get('instagram.pt_password');
    var eng_username = configService.get('instagram.eng_username');
    var eng_password = configService.get('instagram.eng_password');
  }

  if (process.env.PTBR_INSTA_USERNAME || pt_username != '') {
    const portugueseImage = `uploads/ptBR-${path}`;

    const portugueseInstagram = new Instagram();
    await portugueseInstagram.initialize();
    await portugueseInstagram.login(
      process.env.PTBR_INSTA_USERNAME || pt_username,
      process.env.PTBR_INSTA_PASSWORD || pt_password,
      portugueseImage,
    );
  }

  if (process.env.ENG_INSTA_USERNAME || eng_username != '') {
    const englishImage = `uploads/ptBR-${path}`;

    const englishInstagram = new Instagram();
    await englishInstagram.initialize();
    await englishInstagram.login(
      process.env.ENG_INSTA_USERNAME || eng_username,
      process.env.ENG_INSTA_PASSWORD || eng_password,
      englishImage,
    );
  }
};
