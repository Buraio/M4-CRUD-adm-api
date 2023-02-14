import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import { ensureAccountExistsMiddleware } from "../middlewares/ensureAccountExists.middleware";

const userRoutes: Router = Router();

userRoutes.post("", ensureAccountExistsMiddleware, createUserController);


export { userRoutes };
