import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const ImageSchema = new mongoose.Schema(
  {
    pureFile: {
      type: Buffer,
      required: true,
    },
    editedFile: {
      type: Buffer,
      required: false,
      default: null,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface Image extends Document {
  pureFile: Buffer;
  editedFile: Buffer;
  filename: string;
}
