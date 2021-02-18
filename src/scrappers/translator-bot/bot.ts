import { Page } from 'puppeteer';
import { translateText } from './src/translatorBot';

export const translatorBot = async (
  page: Page,
  language: string,
  text: string,
): Promise<string> => {
  const result = await translateText(page, language, text);
  return result;
};
