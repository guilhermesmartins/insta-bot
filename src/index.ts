import { get } from 'config';
import './db/mongoose';
import { Text, TextSchema } from './model/text.model';
import { launch } from 'puppeteer';
import wrap from 'word-wrap';
import { exec } from 'child_process';
import { phraseBot } from './scrappers/phrase-bot/bot';
import { imageDownloaderBot } from './scrappers/image-downloader/bot';
import { instaBot } from './scrappers/instagram/bot';
import { translatorBot } from './scrappers/translator-bot/bot';
import { model } from 'mongoose';
import { schedule } from 'node-cron';

const PRIMARY_LANGUAGE = get('PRIMARY_LANGUAGE');
const SECONDARY_LANGUAGE = get('SECONDARY_LANGUAGE');
const IS_LINUX = get('IS_LINUX');

schedule('0 18 * * *', async () => {
  const Text = model<Text>('Text', TextSchema);
  const browser = await launch();
  const page = await browser.newPage();

  //get one non-used phrase from database
  const data = await Text.findOne({ used: false }); //.sort({ date: 1 });

  //if there is no unused phrase, it will call a scrapper to get a phrase and author from an website
  if (data == null || typeof data == null) {
    // eslint-disable-next-line no-var
    var { text, author } = await phraseBot();
    console.log('Text scrapped');
  } else {
    console.log('Text found in database');
    //if there is a phrase, it will change their status to used and save it
    // eslint-disable-next-line no-var
    var { author, text } = data;
    data.used = true;
    await data.save();
  }
  //above 250 characters ugly the image
  if (text.length > 250) throw new Error('Text bigger than 250 characters');

  console.log('Downloading image...');
  //calling the bot that get the image from lorem picsum and saving the path from this iamge
  const path = await imageDownloaderBot(page);

  console.log('Translating phrases...');
  //getting the text translated to portuguese and english from a google translate bot that ive made
  let wrappedSecondaryText = null;
  if (SECONDARY_LANGUAGE != '') {
    const secondaryText = await translatorBot(
      page,
      SECONDARY_LANGUAGE as string,
      text,
    );
    wrappedSecondaryText = wrap(secondaryText.toUpperCase(), {
      width: 50,
      trim: true,
    });
  }

  let primary = null;
  if (PRIMARY_LANGUAGE != '') {
    primary = await translatorBot(page, PRIMARY_LANGUAGE as string, text);
  } else {
    primary = text;
  }

  //formating the text for the image
  const wrappedPrimary = wrap(primary.toUpperCase(), {
    width: 40,
    trim: true,
  });

  console.log('Running ImageMagick');
  //the hardest part
  //since exec does not wait the imageDownloaderBot to get the image, ive used set time out with an arbitraty timer sufficient for the bot to do their work
  setTimeout(() => {
    exec(`
      convert temp/${path} -font Roboto-Black -brightness-contrast -40 -fill "#efefef" -pointsize 40 -blur 2,2 -gravity Center -annotate +0+300 '${wrappedPrimary}' -size 1080x40 -gravity center -font Courier-Bold -pointsize 30 -background '#BB3300' label:'${
      author.charAt(0).toUpperCase() + author.slice(1)
    }' -append uploads/ptBR-${path}
      ${
        wrappedSecondaryText
          ? `convert temp/${path} -font Bebas-Neue-Regular -brightness-contrast -40 -fill "#efefef" -pointsize 55 -blur 2,2 -gravity Center -annotate +0+280 '${wrappedSecondaryText}' -size 1080x40 -gravity center -font Courier-Bold -pointsize 30 -background '#BB3300' label:'${
              author.charAt(0).toUpperCase() + author.slice(1)
            }' -append uploads/engUS-${path}`
          : ''
      }
    `);
  }, 3000);

  console.log('Calling Instagram...');
  //bot that will post the image on Instagram with the path to the image as a parameter
  await instaBot(page, path);

  console.log('Erasing folders...');
  //a timer bigger than the previous one to clean the temporary folder
  if(IS_LINUX != '') {
    setTimeout(() => {
      exec('rm temp/*.jpg');
    }, 5 * 1000);
  
    //the biggest timer to clean the uploads folder
    setTimeout(() => {
      exec('rm uploads/*.jpg');
    }, 10 * 1000);  
  }
  console.log('Finished');
});
