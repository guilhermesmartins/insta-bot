import { Injectable, InternalServerErrorException } from '@nestjs/common';
import wrap from 'word-wrap';
import { Image, ImageSchema } from './image.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bot } from './scrappers/image-downloader/bot';
import { exec, spawn } from 'child_process';
import { join } from 'path';
import gm from 'gm';
@Injectable()
export class ImageService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
  ) {}
  async receiveAndEdit(info: { text: string; author: string }) {
    //const newPath = join(__dirname, '..', '..', 'uploads', filename);

    const { author, text } = info;

    if (text.length > 300)
      throw new InternalServerErrorException('Text bigger than 300 characters');

    const path = await bot();
    console.log(path);
    //if(path) image without type in the name crashes

    const wrappedText = wrap(text.toUpperCase(), {
      width: 45,
      trim: true,
    });

    // setTimeout(() => {
    //   exec(`
    //   convert temp/${path} -font Bebas-Neues- -brightness-contrast -20 -fill "#efefef" -pointsize 60 -blur 2,2 -gravity Center -annotate +0+300 '${wrappedText}' -size 1080x40 -gravity center -font Courier-Bold -pointsize 30 -background '#BB3300' label:'${author}' -append uploads/${path}.jpg
    // `);
    // }, 3000);

    //BebasNeue-Regular

    setTimeout(() => {
      exec(`
      convert temp/${path} -font Roboto-Black -brightness-contrast -20 -fill "#efefef" -pointsize 42 -blur 2,2 -gravity Center -annotate +0+300 '${wrappedText}' -size 1080x40 -gravity center -font Courier-Bold -pointsize 30 -background '#BB3300' label:'${author}' -append uploads/ptBR-${path}.jpg

      convert temp/${path} -font Bebas-Regular -brightness-contrast -20 -fill "#efefef" -pointsize 60 -blur 2,2 -gravity Center -annotate +0+300 '${wrappedText}' -size 1080x40 -gravity center -font Courier-Bold -pointsize 30 -background '#BB3300' label:'${author}' -append uploads/engUS-${path}.jpg
    `);
    }, 3000);

    setTimeout(() => {
      exec('rm temp/*.jpg');
    }, 3500);
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
