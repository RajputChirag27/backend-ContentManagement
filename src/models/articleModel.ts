
import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IArticle } from "../interfaces/IArticle";

// Schema
const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  }, { timestamps: true });
  
  // Model
  export const Article = mongoose.model<IArticle>('Article', ArticleSchema);