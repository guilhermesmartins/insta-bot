import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReceiveAndEditImage } from './dto/receive-edit-image.dto';
import gm, { Dimensions } from 'gm';
import { join } from 'path';
import { ReceiveInfoAndInsertInImage } from './dto/receive-info-insert-image.dto';
import wrap from 'word-wrap';
import sizeOf from 'image-size';

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

    if (dimensions.width < dimensions.height) {
      const tempValue = dimensions.height;
    }

    gm.subClass({ imageMagick: true });
    gm(path)
      .stroke('black')
      .resize(500, 500)
      .out('-blur', '0x3')
      .fill('white')
      //.extent(500, 500)
      //.blur(2, 1)
      .font('OpenSans.ttf', 20)
      .drawText(dimensions.width / 500, dimensions.height / 7, wrappedText)
      .gravity('SouthWest')
      .write(join(__dirname, '..', '..', 'uploads', filename), (err) => {
        if (err) throw new InternalServerErrorException(err);
      });
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
