import { Page } from 'puppeteer';

export async function translateText(
  page: Page,
  language: string,
  text: string,
): Promise<string> {
  await page.goto('https://translate.google.com/');

  await page.click('button[aria-label="More target languages"]');

  await page.waitForSelector('input[aria-label="Search languages"]');

  await page.type('input[aria-label="Search languages"]', language, {
    delay: 300,
  });
  await page.keyboard.press('Enter');

  await page.click('textarea[aria-label="Source text"]');
  await page.type('textarea[aria-label="Source text"]', text, { delay: 10 });

  await page.waitForSelector('span[data-language-to-translate-into] > span');
  const translatedText = await page.$eval(
    'span[data-language-to-translate-into] > span',
    (e) => e.innerHTML,
  );

  return translatedText;
}
