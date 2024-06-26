import { Container } from "inversify";
import { UserController } from "../controllers/userController";
import { UserService } from "../services";
import { AuthMiddleware } from "../middlewares";
import { TYPES } from "../constants/types";
import { ArticleService } from "../services/articleService";
import { ArticleController } from "../controllers/articleController";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
// container.bind<TaskController>(TYPES.TaskController).to(TaskController)
container.bind<ArticleController>(TYPES.ArticleController).to(ArticleController);

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<ArticleService>(TYPES.ArticleService).to(ArticleService);
// container.bind<TaskService>(TYPES.TaskService).to(TaskService);

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

export default container;
