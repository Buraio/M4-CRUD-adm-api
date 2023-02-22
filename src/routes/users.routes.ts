import { Router } from "express";
import {
  createUserController,
  disableUserAccountController,
  getLoggedUserProfileController,
  listAllUsersController,
  recoverUserAccountController,
  userLoginController,
} from "../controllers/users.controllers";
import { ensureAccountExistsUsingEmail, ensureAccountExistsUsingId } from "../middlewares/ensureAccountExists.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";

const userRoutes: Router = Router();
const loginRoutes: Router = Router();

userRoutes.post("", ensureAccountExistsUsingEmail, createUserController);
userRoutes.get("", ensureTokenIsValidMiddleware, listAllUsersController);
userRoutes.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  getLoggedUserProfileController
);
userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware, ensureAccountExistsUsingId,
  disableUserAccountController
);
userRoutes.put(
  "/:id/recover",
  ensureTokenIsValidMiddleware, ensureAccountExistsUsingId,
  recoverUserAccountController
);

loginRoutes.post("", userLoginController);

export { userRoutes, loginRoutes };
