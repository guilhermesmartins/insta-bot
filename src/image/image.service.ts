import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReceiveAndEditImage } from './dto/receive-edit-image.dto';
import gm from 'gm';
import { join } from 'path';
import { ReceiveInfoAndInsertInImage } from './dto/receive-info-insert-image.dto';

@Injectable()
export class ImageService {
  receiveAndEdit(file: ReceiveAndEditImage, info: ReceiveInfoAndInsertInImage) {
    const { path, filename } = file;
    const { author, text } = info;

    //if(path) image without type in the name crashes

    gm.subClass({ imageMagick: true });
    //gm(path)
    //  .resize(240, 240)
    //  .write(join(__dirname, '..', '..', 'uploads', filename), (err) => {
    //    if (err) throw new InternalServerErrorException(err);
    //  });

    gm(path)
      .stroke('#000000')
      .resize(500, 500)
      .blur(3, 2)
      .font('Arial.tff', 18)
      .label(text)
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
