import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReceiveAndEditImage } from './dto/receive-edit-image.dto';
import gm, { Dimensions } from 'gm';
import { join } from 'path';
import { ReceiveInfoAndInsertInImage } from './dto/receive-info-insert-image.dto';
import wrap from 'word-wrap';
import sizeOf from 'image-size';

import UbuntuMono from '../../assets/fonts/UbuntuMono-B.ttf';
@Injectable()
export class ImageService {
  receiveAndEdit(file: ReceiveAndEditImage, info: ReceiveInfoAndInsertInImage) {
    const { path, filename } = file;
    let { text } = info;

    //if(path) image without type in the name crashes

    text = `"${text}"`;

    const wrappedText = wrap(text.toUpperCase(), {
      width: 30,
      trim: true,
    });

    const dimensions = sizeOf(path);

    gm.subClass({ imageMagick: true });

    gm(path)
      .resize(1080, 1080, '!')
      .blur(2, 2)
      .colorspace('Gray')
      .font('Ubuntu-Mono-Bold.ttf', 40)
      //.gravity(textPositionAccordingToImagePortrait)
      .gravity('Center')
      .fill('black')
      .drawText(dimensions.width / 20, dimensions.height / 5, wrappedText)
      .font('Ubuntu-Mono-Bold.ttf', 40)
      .fill('white')
      .drawText(dimensions.width / 19.9, dimensions.height / 4.9, wrappedText)
      .write(join(__dirname, '..', '..', 'uploads', filename), (err) => {
        if (err) throw new InternalServerErrorException(err);
      });

    // gm(path)
    //   .resize(500, 500)
    //   .background('white')
    //   .blur(2, 1)
    //   .border(2, 2)
    //   .borderColor('#663a24')
    //   .font('Helvetica.ttf', 18)
    //   .gravity(textPositionAccordingToImagePortrait)
    //   .drawText(dimensions.width / 7, dimensions.height / 7, wrappedText)
    //   .write(join(__dirname, '..', '..', 'uploads', filename), (err) => {
    //     if (err) throw new InternalServerErrorException(err);
    //   });
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
