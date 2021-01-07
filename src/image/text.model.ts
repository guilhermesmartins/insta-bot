import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const TextSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface Text extends Document {
  file: string;
}
