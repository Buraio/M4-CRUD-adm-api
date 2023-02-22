import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { getLoggedAccountUsingToken } from "../functions/getLoggedAccountUsingToken";

const verifyAdminUpdateAndDeletePermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const paramsId = Number(req.params.id);

  const userData = getLoggedAccountUsingToken(req.headers.authorization);

  const { result, decodedToken } = await userData;

  const isParamsIdFromLoggedUser = paramsId === Number(decodedToken);

  if (!result.admin && !isParamsIdFromLoggedUser) {
    throw new AppError("Insufficient permission", 403);
  }

  next();
};

export { verifyAdminUpdateAndDeletePermissionMiddleware };
