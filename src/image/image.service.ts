import { Injectable, InternalServerErrorException } from '@nestjs/common';
import wrap from 'word-wrap';
import { Image, ImageSchema } from './image.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import fs from 'fs';
import { arrayBufferToBase64 } from './functions/arrayBufferToBase64';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
  ) {}
  async receiveAndEdit(text: string, author: string) {
    //const { path, filename } = file;
    //const newPath = join(__dirname, '..', '..', 'uploads', filename);

    if (text.length > 300)
      throw new InternalServerErrorException('Text bigger than 300 characters');

    const image = await api.get('/recentPic');

    console.log('==============\n' + image.data.pureFile.data);
    const renderedImage = Buffer.from(image.data.pureFile.data);
    console.log(renderedImage);

    fs.createWriteStream(`./temp/${Buffer.from(image.data.pureFile.data)}`);

    // const image = await this.imageModel.findOne(
    //   {},
    //   {},
    //   { sort: { created_at: -1 } },
    // );

    // //console.log(image);
    // console.log(image.pureFile);

    // fs.writeFileSync(`./${image.filename}`, image.pureFile, {});

    //if(path) image without type in the name crashes

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
