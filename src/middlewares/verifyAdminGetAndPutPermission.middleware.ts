import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { getLoggedAccountUsingToken } from "../functions/getLoggedAccountUsingToken";

const verifyAdminGetAndPutPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData = getLoggedAccountUsingToken(req.headers.authorization);

  const { result } = await userData;

  if (!result.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};

export { verifyAdminGetAndPutPermissionMiddleware };
