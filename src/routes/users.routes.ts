import { Router } from "express";
import {
  createUserController,
  disableUserAccountController,
  getLoggedUserProfileController,
  listAllUsersController,
  recoverUserAccountController,
  updateUserAccountController,
  userLoginController,
} from "../controllers/users.controllers";
import {
  ensureAccountExistsUsingEmail,
  ensureAccountExistsUsingId,
} from "../middlewares/ensureAccountExists.middleware";
import { ensureAccountIsNotActiveMiddleware } from "../middlewares/ensureAccountIsNotActive.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { verifyAdminUpdateAndDeletePermissionMiddleware } from "../middlewares/verifyAdminUpdateAndDeletePermission.middleware";
import { verifyAdminGetAndPutPermissionMiddleware } from "../middlewares/verifyAdminGetAndPutPermission.middleware";

const userRoutes: Router = Router();
const loginRoutes: Router = Router();

userRoutes.post("", ensureAccountExistsUsingEmail, createUserController);
userRoutes.get("", ensureTokenIsValidMiddleware, verifyAdminGetAndPutPermissionMiddleware, listAllUsersController);
userRoutes.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  getLoggedUserProfileController
);
userRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  verifyAdminUpdateAndDeletePermissionMiddleware,
  ensureAccountExistsUsingEmail,
  ensureAccountExistsUsingId,
  updateUserAccountController
);
userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  verifyAdminUpdateAndDeletePermissionMiddleware,
  ensureAccountExistsUsingId,
  disableUserAccountController
);
userRoutes.put(
  "/:id/recover",
  ensureTokenIsValidMiddleware,
  verifyAdminGetAndPutPermissionMiddleware,
  ensureAccountExistsUsingId,
  ensureAccountIsNotActiveMiddleware,
  recoverUserAccountController
);

loginRoutes.post("", userLoginController);

export { userRoutes, loginRoutes };
