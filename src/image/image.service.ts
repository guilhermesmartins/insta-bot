import { Injectable, InternalServerErrorException } from '@nestjs/common';
import wrap from 'word-wrap';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Text } from './text.model';
import { imageDownloaderBot } from './scrappers/image-downloader/bot';
import { exec } from 'child_process';
import { translatorBot } from './scrappers/translator-bot/bot';
import { instaBot } from './scrappers/instagram/bot';
import { phraseBot } from './scrappers/phrase-bot/bot';
@Injectable()
export class ImageService {
  constructor(@InjectModel('Text') private readonly textModel: Model<Text>) {}
  async receiveAndEdit() {
    //get one non-used phrase from database
    const data: Text = await this.textModel.findOne({ used: false }); //.sort({ date: 1 });

    //if there is no unsed phrase, it will call a scrapper to get a phrase and author from an website
    if (data == null || typeof data == null) {
      // eslint-disable-next-line no-var
      var { text, author } = await phraseBot();
    } else {
      //if there is a phrase, it will change their status to used and save it
      // eslint-disable-next-line no-var
      var { author, text } = data;
      data.used = true;
      await data.save();
    }
    //above 250 characters ugly the image
    if (text.length > 250)
      throw new InternalServerErrorException('Text bigger than 250 characters');

    //calling the bot that get the image from lorem picsum and saving the path from this iamge
    const path = await imageDownloaderBot();

    //if(path) image without type in the name crashes

    //getting the text translated to portuguese and english from a google translate bot that ive made
    const englishText = await translatorBot('English', text);
    const portugueseText = await translatorBot('Portuguese', text);

    //formating the text for the image
    const wrappedPortugueseText = wrap(portugueseText.toUpperCase(), {
      width: 40,
      trim: true,
    });

    const wrappedEnglishText = wrap(englishText.toUpperCase(), {
      width: 50,
      trim: true,
    });

    //the hardest part
    //since exec does not wait the imageDownloaderBot to get the image, ive used set time out with an arbitraty timer sufficient for the bot to do their work
    setTimeout(() => {
      exec(`
      convert temp/${path} -font Roboto-Black -brightness-contrast -40 -fill "#efefef" -pointsize 40 -blur 2,2 -gravity Center -annotate +0+300 '${wrappedPortugueseText}' -size 1080x40 -gravity center -font Courier-Bold -pointsize 30 -background '#BB3300' label:'${
        author.charAt(0).toUpperCase() + author.slice(1)
      }' -append uploads/ptBR-${path}

      convert temp/${path} -font Bebas-Neue-Regular -brightness-contrast -40 -fill "#efefef" -pointsize 55 -blur 2,2 -gravity Center -annotate +0+280 '${wrappedEnglishText}' -size 1080x40 -gravity center -font Courier-Bold -pointsize 30 -background '#BB3300' label:'${
        author.charAt(0).toUpperCase() + author.slice(1)
      }' -append uploads/engUS-${path}
    `);
    }, 3000);

    //a timer bigger than the previous one to clean the temporary folder
    setTimeout(() => {
      exec('rm temp/*.jpg');
    }, 3500);

    //bot that will post the image on Instagram with the path to the image as a parameter
    await instaBot(path);

    //the biggest timer to clean the uploads folder
    setTimeout(() => {
      exec('rm uploads/*.jpg');
    }, 5000);
  }
}
