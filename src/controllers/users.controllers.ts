import { Request, Response } from "express";
import {
  iCreateUserRequest,
  iUserLoginRequest,
} from "../interfaces/users.interface";
import { createUserService } from "../services/createUser.service";
import { userLoginService } from "../services/userLogin.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: iCreateUserRequest = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const userLoginController = async (req: Request, res: Response) => {
  const userData: iUserLoginRequest = req.body;

  const newUser = await userLoginService(userData);

  return res.status(200).json(newUser);
};

export { createUserController, userLoginController };
