import { Translator } from './src/translatorBot';

export const translatorBot = async (
  language: string,
  text: string,
): Promise<string> => {
  const translator = new Translator();
  await translator.initialize();
  const result = await translator.translateText(language, text);
  return result;
};
