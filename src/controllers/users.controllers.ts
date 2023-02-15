import { Request, Response } from "express";
import { iCreateUserRequest } from "../interfaces/users.interface";
import { createUserService } from "../services/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: iCreateUserRequest = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export { createUserController };
