import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReceiveAndEditImage } from './dto/receive-edit-image.dto';
import gm, { Dimensions } from 'gm';
import { join } from 'path';
import { ReceiveInfoAndInsertInImage } from './dto/receive-info-insert-image.dto';
import wrap from 'word-wrap';
import sizeOf from 'image-size';
import { downloadFileCurl } from './functions/downloadFileCurl';
@Injectable()
export class ImageService {
  async receiveAndEdit(
    file: ReceiveAndEditImage,
    info: ReceiveInfoAndInsertInImage,
  ) {
    //const { path, filename } = file;
    //const newPath = join(__dirname, '..', '..', 'uploads', filename);
    const { text, author } = info;

    if (text.length > 300)
      throw new InternalServerErrorException('Text bigger than 300 characters');

    //if(path) image without type in the name crashes

    //text = `"${text}"`;

    //downloadFileCurl('https://picsum.photos/1080');

    const wrappedText = wrap(text.toUpperCase(), {
      width: 45,
      trim: true,
    });

    // exec(
    //   //sortear gravity e annotate
    //   //caption:'${author}'
    //   `convert ${path} -font Bebas-Regular -brightness-contrast -20 -fill "#efefef" -pointsize 60 -blur 2,2 -gravity Center -annotate +0+300 '${wrappedText}' -size 1080x40 -gravity center -font Courier-Bold -pointsize 30 -background '#BB3300' label:'${author}' -append ${newPath}`, //output.png`,
    //   (err, stdout, stderr) => {
    //     if (err || stderr)
    //       throw new InternalServerErrorException(err || stderr);

    //     console.log(stdout);
    //   },
    // );
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
