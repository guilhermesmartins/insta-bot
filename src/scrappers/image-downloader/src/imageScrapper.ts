import { Page } from 'puppeteer';
import fs from 'fs';
import fetch from 'node-fetch';

interface Image extends Element {
  src: string;
}

const imageScrapper = async (page: Page) => {
  await page.goto('https://picsum.photos/1080/1040');

  await page.waitForSelector('img');

  const imageURL = await page.$eval('img', (element: Image) => element.src);

  const filename = imageURL.split('/').pop();

  //await write(`./temp/${filename}.jpg`, filename);

  fetch(imageURL).then((res) => {
    const dest = fs.createWriteStream(`temp/${filename}.jpg`); //join('temp', `${filename}.jpg`)); //join(`./temp/${filename}.jpg`));
    res.body.pipe(dest);
  });

  return `${filename}.jpg`;
};

export default imageScrapper;
