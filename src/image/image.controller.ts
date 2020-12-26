import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './interceptors/filename';
import { type } from 'os';
import { ReceiveAndEditImage } from './dto/receive-edit-image.dto';
import { ReceiveInfoAndInsertInImage } from './dto/receive-info-insert-image.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './temp',
        filename: editFileName,
      }),
      //fileFilter: imageFileFilter,
    }),
  )
  async postImage(
    @UploadedFile() file: ReceiveAndEditImage,
    @Body() info: ReceiveInfoAndInsertInImage,
  ) {
    return this.imageService.receiveAndEdit(file, info);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.imageService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
