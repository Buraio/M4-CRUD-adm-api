import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleErrorsMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  } else if (error instanceof ZodError) {
    if (error.flatten().formErrors.length > 0) {
      return res.status(400).json({
        message: error.flatten().formErrors,
      });
    }
    return res.status(400).json({
      message: error.flatten().fieldErrors,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleErrorsMiddleware };
