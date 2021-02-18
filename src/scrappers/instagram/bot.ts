import { get } from 'config';
import { Page } from 'puppeteer';
import { instagram } from './src/instagram';

const PRIMARY_INSTA_USERNAME = get('PRIMARY_INSTA_USERNAME');
const PRIMARY_INSTA_PASSWORD = get('PRIMARY_INSTA_PASSWORD');
const SECONDARY_INSTA_USERNAME = get('SECONDARY_INSTA_USERNAME');
const SECONDARY_INSTA_PASSWORD = get('SECONDARY_INSTA_PASSWORD');

export const instaBot = async (page: Page, path: string) => {
  console.log('Initiating Instagram...');

  if (PRIMARY_INSTA_USERNAME != '') {
    const primaryImage = `uploads/ptBR-${path}`;

    await instagram(
      page,
      PRIMARY_INSTA_USERNAME as string,
      PRIMARY_INSTA_PASSWORD as string,
      primaryImage,
    );
  }

  if (SECONDARY_INSTA_USERNAME != '') {
    const secondaryImage = `uploads/ptBR-${path}`;

    await instagram(
      page,
      SECONDARY_INSTA_USERNAME as string,
      SECONDARY_INSTA_PASSWORD as string,
      secondaryImage,
    );
  }
};
