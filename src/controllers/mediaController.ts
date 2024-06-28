import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../constants";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../handlers/errorHandler";
import { ApiHandler } from "../handlers/apiHandler";
import { CustomError } from "../helpers";
import { statusCode } from "../constants";
import { AuthRequest, IMedia } from "../interfaces";
import { MediaService } from "../services/mediaService";
import { upload } from "../middlewares/multerMiddleware";
// import { AuthMiddleware } from "../middlewares";

@controller("/media")
export class MediaController {
  constructor(
    @inject(TYPES.MediaService) private readonly _mediaService: MediaService,
  ) {}

  @httpPost("/", TYPES.AuthMiddleware, upload.single("file"))
  async uploadMedia(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      const { title, description, tags } = req.body;
      const uploadedBy = req.user._id;
      const result = await this._mediaService.uploadMedia(file, {
        title,
        description,
        uploadedBy,
        tags,
      });
      return new ApiHandler(result, "Media uploaded successfully");
    } catch (err) {
      errorHandler(req, res, next, err);
    }
  }

  @httpGet("/", TYPES.AuthMiddleware)
  async getMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._mediaService.viewMedia();
      return new ApiHandler(result, "Media fetched successfully");
    } catch (err) {
      errorHandler(req, res, next, err);
    }
  }

  @httpGet("/:id", TYPES.AuthMiddleware)
  async getMediaById(req: Request, res: Response, next: NextFunction) {
    try {
      const  id  = req.params.id;
      const result = await this._mediaService.viewMediaById(id);
      return new ApiHandler(result, "Media fetched successfully");
    } catch (err) {
      errorHandler(req, res, next, err);
    }
  }

  @httpPut("/:id", TYPES.AuthMiddleware)
  async updateMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const  id  = req.params.id;
      const { title, description, tags } = req.body;
      const body = { title, description, tags };
      const result = await this._mediaService.updateMedia(id,body);
      return new ApiHandler(result, "Media fetched successfully");
    } catch (err) {
      errorHandler(req, res, next, err);
    }
  }

  @httpDelete("/:id", TYPES.AuthMiddleware)
  async deleteMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this._mediaService.deleteMedia(id);
      return new ApiHandler(result, "Media deleted successfully");
    } catch (err) {
      errorHandler(req, res, next, err);
    }
  }
}
