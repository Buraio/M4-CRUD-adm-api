import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";
import { AppError } from "../errors";
import { iRetrievedUserData } from "../interfaces/users.interface";

const ensureAccountIsNotActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const paramsId = Number(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM users
    WHERE "id" = %L
    `,
    paramsId
  );

  const queryResult: QueryResult = await client.query(queryString);

  const userData: iRetrievedUserData = queryResult.rows[0];

  if (userData.active) {
    throw new AppError("User already active", 400);
  }

  next();
};

export { ensureAccountIsNotActiveMiddleware };
