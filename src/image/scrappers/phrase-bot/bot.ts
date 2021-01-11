import cheerio from 'cheerio';
//import request from 'request';
import request from 'request';
import axios from 'axios';

export const phraseBot = async (): Promise<{
  text: string;
  author: string;
}> => {
  // eslint-disable-next-line no-var
  let text: string, author: string;
  let arr: string[];

  const result = await axios.get(
    `https://www.pensador.com/frases_filosofos/${Math.round(
      Math.random() * 17 + 1,
    )}/`,
  );

  const $ = cheerio.load(result.data);

  const chooseCard = $('.thought-card')[
    Math.round(Math.random() * $('.thought-card').length + 1)
  ];

  [text, author] = $(`#${chooseCard.attribs.id}`)
    .attr('data-alt')
    .split('... Frase de');

  text = text.trim();
  author = author.trim().replace('.', '');

  return { text, author };
};
