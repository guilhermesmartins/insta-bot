import { Controller, Post } from '@nestjs/common';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { type } from 'os';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  async postImage() {
    return this.imageService.receiveAndEdit();
  }
}
