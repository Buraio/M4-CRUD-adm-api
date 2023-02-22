import { Request, Response } from "express";
import {
  iUserRequest,
  iUserLoginRequest,
} from "../interfaces/users.interface";
import { createUserService } from "../services/createUser.service";
import { disableUserAccountService } from "../services/disableUserAccount.service";
import { getLoggedUserProfileService } from "../services/getLoggedUserProfile.service";
import { listAllUsersService } from "../services/listAllUsers.service";
import { recoverUserAccountService } from "../services/recoverUserAccount.service";
import { userLoginService } from "../services/userLogin.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: iUserRequest = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const userLoginController = async (req: Request, res: Response) => {
  const userData: iUserLoginRequest = req.body;

  const newUser = await userLoginService(userData);

  return res.status(200).json(newUser);
};

const listAllUsersController = async (req: Request, res: Response) => {
  const userList = await listAllUsersService();

  return res.status(200).json(userList);
};

const getLoggedUserProfileController = async (req: Request, res: Response) => {
  let token = req.headers.authorization!;

  token = token.split(" ")[1];

  const userProfile = await getLoggedUserProfileService(token);

  return res.status(200).json(userProfile);
};

const disableUserAccountController = async (req: Request, res: Response) => {
  const paramsId = Number(req.params.id);

  await disableUserAccountService(paramsId);

  return res.status(204).send();
};

const recoverUserAccountController = async (req: Request, res: Response) => {
  const paramsId = Number(req.params.id);

  await recoverUserAccountService(paramsId);

  return res.status(204).send();
};

export {
  createUserController,
  userLoginController,
  listAllUsersController,
  disableUserAccountController,
  getLoggedUserProfileController,
  recoverUserAccountController,
};
