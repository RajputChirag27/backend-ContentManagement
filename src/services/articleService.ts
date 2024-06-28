// services/article.service.ts
import { injectable } from "inversify";
import { Article } from "../models/articleModel";
import { IArticle } from "../interfaces/IArticle";
import { CustomError } from "../helpers";
import { messages, statusCode } from "../constants";

@injectable()
export class ArticleService {
  async getArticles(): Promise<IArticle[]> {
    return await Article.find().exec();
  }

  async getArticleById(id: string): Promise<IArticle | null> {
    return await Article.findById(id).exec();
  }

  async createArticle(body: any): Promise<IArticle> {
    const article = new Article(body);
    const result = await article.save();
    if (!result) {
      throw new CustomError(
        messages.Article_Not_Created.name,
        statusCode.BAD_REQUEST,
        messages.Article_Not_Created.message,
      );
    }
    return result;
  }

  async updateArticle(id: string, body: any): Promise<IArticle | null> {
    const article = await Article.findByIdAndUpdate(id, body, {
      new: true,
    }).exec();
    if (!article) {
      throw new CustomError(
        messages.Article_Not_Found.name,
        statusCode.NOT_FOUND,
        messages.Article_Not_Found.message,
      );
    }
    return article;
  }

  async deleteArticle(id: string): Promise<IArticle | null> {
    const article = await Article.findByIdAndDelete(id).exec();
    if (!article) {
      throw new CustomError(
        messages.Article_Not_Found.name,
        statusCode.NOT_FOUND,
        messages.Article_Not_Found.message,
      );
    }
    return article;
  }
}
