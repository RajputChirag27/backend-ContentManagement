import { Document, Schema } from "mongoose";

export interface IMedia extends Document {
  title: string;
  description?: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  uploadedBy: Schema.Types.ObjectId;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
