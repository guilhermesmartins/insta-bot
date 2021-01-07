import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ImageModule,
    MongooseModule.forRoot(
      'mongodb+srv://eduardo:VVbgmineg450@image-db.ki8az.mongodb.net/image?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
