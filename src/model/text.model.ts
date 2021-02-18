import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const TextSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
      default: 'unknow author',
    },
    used: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export interface Text extends Document {
  text: string;
  author: string;
  used: boolean;
}
