import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TextSchema } from './text.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Text', schema: TextSchema }])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
