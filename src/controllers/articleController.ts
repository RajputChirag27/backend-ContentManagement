// controllers/article.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import { inject } from "inversify";
import { ArticleService } from "../services/articleService";
import { TYPES } from "../constants";
import { ApiHandler } from "../handlers/apiHandler";
import { errorHandler } from "../handlers";

@controller("/articles")
export class ArticleController {
  constructor(
    @inject(TYPES.ArticleService)
    private readonly _articleService: ArticleService,
  ) {}

  @httpGet("/")
  async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const articles = await this._articleService.getArticles();
      res.send(new ApiHandler(articles, "Articles fetched successfully"));
    } catch (err) {
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }

  @httpGet("/:id")
  async getArticleById(req: Request, res: Response, next: NextFunction) {
    try {
      const article = await this._articleService.getArticleById(req.params.id);
      res.send(new ApiHandler(article, "Article fetched successfully"));
    } catch (err) {
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }

  @httpPost("/")
  async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const article = await this._articleService.createArticle(req.body);
      res.send(new ApiHandler(article, "Article created successfully"));
    } catch (err) {
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }

  @httpPut("/:id")
  async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const article = await this._articleService.updateArticle(
        req.params.id,
        req.body,
      );
      res.send(new ApiHandler(article, "Article updated successfully"));
    } catch (err) {
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }

  @httpDelete("/:id")
  async deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const article = await this._articleService.deleteArticle(req.params.id);
      res.send(new ApiHandler(article, "Article deleted successfully"));
    } catch (err) {
      if (!res.headersSent) errorHandler(req, res, next, err);
    }
  }
}
