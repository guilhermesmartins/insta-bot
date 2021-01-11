import imageScrapper from './src/imageScrapper';
import imageCompressor from './src/imageCompressor';

export const imageDownloaderBot = async () => {
  const path = await imageScrapper();

  await imageCompressor();

  // exec('rm  ../../uploads/*.jpg');
  // exec('rm ../../temp/*.jpg');

  return path;
};
