import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";

const ensureTokenIsValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let token: string | undefined = req.headers.authorization;

  if (!token) {
    throw new AppError("Token is missing", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
  });

  next();
};

export { ensureTokenIsValidMiddleware };
