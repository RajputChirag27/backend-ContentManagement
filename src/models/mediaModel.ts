import { Schema, model } from "mongoose";
import { IMedia } from "../interfaces/IMedia";

const mediaSchema = new Schema<IMedia>(
  {
    title: { type: String, required: true },
    description: { type: String },
    filePath: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String] },
  },
  {
    timestamps: true,
  },
);

export const Media = model<IMedia>("Media", mediaSchema);
