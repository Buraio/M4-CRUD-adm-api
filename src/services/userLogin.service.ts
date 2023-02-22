import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { QueryConfig, QueryResult } from "pg";
import { z } from "zod";
import { client } from "../database/config";
import { AppError } from "../errors";
import {
  iRetrievedUserData,
  iUserLoginRequest,
} from "../interfaces/users.interface";
import { userLoginSchema } from "../schemas/createUser.schema";

const userLoginService = async (userData: iUserLoginRequest) => {
  const requestObjValidation = userLoginSchema.safeParse(userData);

  if (!requestObjValidation.success) {
    const error = requestObjValidation.error;
    throw new z.ZodError(error.issues);
  } else {
    const { data } = requestObjValidation;

    let queryString: string = `
      SELECT * FROM users
      WHERE "email" = $1;
    `;

    let queryConfig: QueryConfig = {
      text: queryString,
      values: [data.email],
    };

    let queryResult: QueryResult = await client.query(queryConfig);

    const retrievedUserData: iRetrievedUserData = queryResult.rows[0];

    if (retrievedUserData === undefined) {
      throw new AppError("Wrong email/password", 401);
    }

    const encryptedPasswordComparison: boolean = await compare(
      data.password,
      retrievedUserData.password
    );

    if (!encryptedPasswordComparison || !retrievedUserData.active) {
      throw new AppError("Wrong email/password", 401);
    }

    const token = sign(
      {
        email: data.email,
      },
      String(process.env.SECRET_KEY!),
      {
        expiresIn: "24h",
        subject: retrievedUserData.id,
      }
    );

    return { token: token };
  }
};

export { userLoginService };
