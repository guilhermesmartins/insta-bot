import imageScrapper from './src/imageScrapper';
import imageCompressor from './src/imageCompressor';
import { Page } from 'puppeteer';

export const imageDownloaderBot = async (page: Page) => {
  const path = await imageScrapper(page);

  await imageCompressor();

  return path;
};
