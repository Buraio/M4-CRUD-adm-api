import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";
import { AppError } from "../errors";

const ensureAccountExistsUsingEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  const queryString: string = format(
    `
    SELECT * FROM users
    WHERE "email" = %L
    `,
    body.email
  );

  const queryResult: QueryResult = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    throw new AppError("Email already exists", 409);
  }

  next();
};

const ensureAccountExistsUsingId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paramsId = Number(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM users
    WHERE "id" = %L
    `,
    paramsId
  );

  const queryResult: QueryResult = await client.query(queryString);

    console.log(queryResult.rowCount)

  if (queryResult.rowCount === 0) {
    throw new AppError("User does not exist", 409);
  }

  next();
};

export { ensureAccountExistsUsingEmail, ensureAccountExistsUsingId };