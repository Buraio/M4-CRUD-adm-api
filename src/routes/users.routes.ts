import { Router } from "express";
import { createUserController, userLoginController } from "../controllers/users.controllers";
import { ensureAccountExistsMiddleware } from "../middlewares/ensureAccountExists.middleware";

const userRoutes: Router = Router();
const loginRoutes: Router = Router();

userRoutes.post("", ensureAccountExistsMiddleware, createUserController);

loginRoutes.post("", userLoginController);


export { userRoutes, loginRoutes };
