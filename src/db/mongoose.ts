import { get } from 'config';
import { connect } from 'mongoose';
import { resolve } from 'path';

const MONGODB_URL = get('MONGODB_URL');

console.log(resolve(process.cwd(), '.env'));
console.log(MONGODB_URL);

connect(MONGODB_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
