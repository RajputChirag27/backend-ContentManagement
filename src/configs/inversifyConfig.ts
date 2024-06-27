import { Container } from "inversify";
import { UserController } from "../controllers/userController";
import { UserService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { TYPES } from "../constants/types";
import { ArticleService } from "../services/articleService";
import { ArticleController } from "../controllers/articleController";
import { MediaService } from "../services/mediaService";
import { MediaController } from "../controllers/mediaController";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
// container.bind<TaskController>(TYPES.TaskController).to(TaskController)
container.bind<ArticleController>(TYPES.ArticleController).to(ArticleController);
container.bind<MediaController>(TYPES.MediaController).to(MediaController);

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<ArticleService>(TYPES.ArticleService).to(ArticleService);
container.bind<MediaService>(TYPES.MediaService).to(MediaService);
// container.bind<TaskService>(TYPES.TaskService).to(TaskService);

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

export default container;
