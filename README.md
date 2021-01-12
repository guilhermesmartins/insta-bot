  <h1 align="center">Insta-Bot</h1>
  <p align="center">Bot that receives (or not) a phrase, edit an image with the phrase and post it on instagram in portuguese and english</p>
## Description
  This project utilizes 4 bots plus ImageMagick to insert a phrase into an image, the author of this phrase and post the image on Instagram. A post request is made to the backend, and the bot will see if there is a unused phrase on the mongodb database (I've made a Telegram Bot to insert images, you can access it <a href="https://github.com/guilhermeSMartins/insta-bot-telegram/">here</a>). If there aren't, the backend will call a bot to scrap an phrase and author from the website pensador.com. After getting the content, the picture bot will get an random image in the dimensions 1050x1040 from lorem picsum and save it on the temp file, with size optimized. Soon after the image bot ends, a translator bot will be called to translate the phrase to portuguese and english and returning the text translated. With the new two texts, the exec function will be called and ImageMagick will build the image with some effects, the texts translated, a label for the author and save it on the uploads folder. So, the instagram bot will be called to post the images on a english and portuguese profiles. To finish, the backend will clean the two folders, uploads and temp.
  
## Installation

To run this work, you will need <a href="https://imagemagick.org/script/download.php">ImageMagick</a> and <a href="http://www.graphicsmagick.org/download.html">GraphicsMagick</a> on your machine. Although its not required, to build the images I've used the <a href="https://fonts2u.com/roboto-black.font">Roboto-Black</a> and <a href="https://www.dafont.com/bebas-neue.font">Bebas-Neue-Regular</a> fonts. After download Image and Graphics Magick, download/clone this repo and run ```npm install``` to download the dependencies needed for this project. After that, run ```npm start``` to run the application and do a post request on the '/image'.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
