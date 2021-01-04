import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReceiveAndEditImage } from './dto/receive-edit-image.dto';
import gm, { Dimensions } from 'gm';
import { join } from 'path';
import { ReceiveInfoAndInsertInImage } from './dto/receive-info-insert-image.dto';
import wrap from 'word-wrap';
import sizeOf from 'image-size';
import {
  FONT_SANS_32_BLACK,
  loadFont,
  measureText,
  measureTextHeight,
  read,
} from 'jimp';
import { exec } from 'child_process';

import UbuntuMono from '../../assets/fonts/UbuntuMono-B.ttf';
import { stderr, stdout } from 'process';
@Injectable()
export class ImageService {
  async receiveAndEdit(
    file: ReceiveAndEditImage,
    info: ReceiveInfoAndInsertInImage,
  ) {
    const { path, filename } = file;
    const newPath = join(__dirname, '..', '..', 'uploads', filename);
    let { text } = info;

    if (text.length > 150)
      throw new InternalServerErrorException('Text bigger than 150 characters');

    //if(path) image without type in the name crashes

    text = `"${text}"`;

    const wrappedText = wrap(text.toUpperCase(), {
      width: 30,
      trim: true,
    });

    exec(
      //sortear gravity e annotate
      `convert ${path} -brightness-contrast -20 -font Roboto-Bold -fill "#efefef" -pointsize 40 -blur 2,2 -gravity Center -annotate +0+200 '${wrappedText}' output.png`,
      (err, stdout, stderr) => {
        if (err || stderr)
          throw new InternalServerErrorException(err || stderr);

        console.log(stdout);
      },
    );

    //const dimensions = sizeOf(path);

    // const image = await read(path);
    // image.resize(1080, 1080).quality(60).blur(1).brightness(0.7); //.greyscale(); //.write(newPath);

    // const font28 = await loadFont(
    //   join(__dirname, '..', '..', 'assets', 'fonts', 'font28.fnt'),
    // );
    // const font = await loadFont(FONT_SANS_32_BLACK);

    // const imageWidth = measureText(font, wrappedText);
    // const imageHeight = measureTextHeight(font, wrappedText, 1080);

    // //image.print(font, 54, 108, wrappedText).write(newPath);
    // image
    //   .print(
    //     font28,
    //     imageWidth / 20,
    //     imageHeight / 20,
    //     text.toUpperCase().trim(),
    //   )
    //   .write(newPath);

    //image.print(FONT_SANS_64_BLACK, 540, 540, wrappedText).write(newPath);

    //gm.subClass({ imageMagick: false });

    // gm(path)
    //   //.out('-fontSize', '15')
    //   .out('-font', 'Ubuntu')
    //   .out('-colorspace', 'Gray')
    //   .out('-label', wrappedText)
    //   .out('-gravity', 'center')
    //   .write(join(__dirname, '..', '..', 'uploads', filename), (err) => {
    //     if (err) throw new InternalServerErrorException(err);
    //   });

    // gm(path)
    //   .resize(1080, 1080, '!')
    //   .blur(2, 2)
    //   .colorspace('Gray')
    //   .out('-font', 'Open-Sans-Extrabold-Italic')
    //   .fontSize(40)
    //   //.font('Ubuntu-Mono-Bold-Italic', 40)
    //   .gravity('Center')
    //   .fill('white')
    //   .drawText(54, 216, wrappedText)
    //   // .font(('../../assets/fonts/UbuntuMono-B.ttf', 40)
    //   // .fill('white')
    //   // .drawText(54.27135678392, 220.40816326531, wrappedText)
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
