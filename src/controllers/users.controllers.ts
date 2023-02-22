import { Request, Response } from "express";
import {
  iUserRequest,
  iUserLoginRequest,
  iRetrievedUserData,
} from "../interfaces/users.interface";
import {
  createUserService,
  disableUserAccountService,
  getLoggedUserProfileService,
  listAllUsersService,
  recoverUserAccountService,
  updateUserAccountService,
  userLoginService,
} from "../services/";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: iUserRequest = req.body;

  const newUser: iRetrievedUserData = await createUserService(userData);

  return res.status(201).json(newUser);
};

const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: iUserLoginRequest = req.body;

  const newUser = await userLoginService(userData);

  return res.status(200).json(newUser);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userList = await listAllUsersService();

  return res.status(200).json(userList);
};

const getLoggedUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let token = req.headers.authorization!;

  token = token.split(" ")[1];

  const userProfile = await getLoggedUserProfileService(token);

  return res.status(200).json(userProfile);
};

const disableUserAccountController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const paramsId = Number(req.params.id);

  await disableUserAccountService(paramsId);

  return res.status(204).send();
};

const recoverUserAccountController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const paramsId = Number(req.params.id);

  await recoverUserAccountService(paramsId);

  return res.status(204).send();
};

const updateUserAccountController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const paramsId = Number(req.params.id);
  const body = req.body;

  const userProfile = await updateUserAccountService(paramsId, body);

  return res.status(200).json(userProfile);
};

export {
  createUserController,
  userLoginController,
  listAllUsersController,
  disableUserAccountController,
  getLoggedUserProfileController,
  recoverUserAccountController,
  updateUserAccountController,
};
