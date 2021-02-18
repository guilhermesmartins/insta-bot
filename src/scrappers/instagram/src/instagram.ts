import { devices, Page } from 'puppeteer';

const iPhone = devices['iPhone 8'];

export async function instagram(
  page: Page,
  username: string,
  password: string,
  image: string,
): Promise<void> {
  await page.emulate(iPhone);

  await page.goto('https://www.instagram.com/');

  await page.waitForSelector('button[type="button"]');
  await page.click('button[type="button"]');

  await page.waitForSelector('input[name="username"]');

  await page.type('input[name="username"]', username, { delay: 100 });
  await page.type('input[name="password"]', password, { delay: 50 });
  await page.click('button[type="submit"]');

  const loginInfoBtn = await page.$('button[type="button"]');

  console.log(await page.$('.coreSpriteKeyhole'));

  if (await page.$('.coreSpriteKeyhole')) {
    await page.waitForSelector('.coreSpriteKeyhole');
  }

  if (loginInfoBtn != null) {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  }

  console.log('login made');

  await page.waitForSelector('div[role="menuitem"]');

  await page.evaluate(() => {
    document.querySelector("[aria-label='New Post']").parentElement.click();
  });

  const fileInputs = await page.$$("input[type='file']");
  const input = fileInputs[fileInputs.length - 1];

  await page.evaluate(() =>
    document.querySelector("[aria-label='New Post']").parentElement.click(),
  );

  await input.uploadFile(image);

  //all the code below is from https://github.com/jamesgrams, thanks for sharing your repo!
  await page.waitForXPath("//button[contains(text(),'Next')]");

  const next = await page.$x("//button[contains(text(),'Next')]");
  await next[0].click();

  await page.waitForXPath("//button[contains(text(),'Share')]");
  const share = await page.$x("//button[contains(text(),'Share')]");

  await share[0].click();

  console.log('image posted');
}
