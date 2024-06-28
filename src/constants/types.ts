export const TYPES = {
  // Controllers
  UserController: Symbol.for("UserController"),
  ArticleController: Symbol.for("ArticleController"),
  MediaController: Symbol.for("MediaController"),
  // Services
  UserService: Symbol.for("UserService"),
  ArticleService: Symbol.for("ArticleService"),
  MediaService: Symbol.for("MediaService"),

  // Middlewares
  AuthMiddleware: Symbol.for("AuthMiddleware"),
};
