import imagemin from 'imagemin';

const imageCompressor = async () => {
  const files = await imagemin(['temp/*.jpg'], {
    destination: './temp',
    plugins: [],
  });
};

export default imageCompressor;
