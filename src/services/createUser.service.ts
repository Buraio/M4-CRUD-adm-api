import { hash } from "bcryptjs";
import { QueryResult } from "pg";
import format from "pg-format";
import { ZodError } from "zod";
import { client } from "../database/config";
import {
  iRetrievedUserData,
  iUserRequest,
} from "../interfaces/users.interface";
import { createUserSchema } from "../schemas/createUser.schema";

const createUserService = async (
  userData: iUserRequest
): Promise<iRetrievedUserData> => {
  const requestObjValidation = createUserSchema.safeParse(userData);

  if (!requestObjValidation.success) {
    const error = requestObjValidation.error;
    throw new ZodError(error.issues);
  } else {
    const { data } = requestObjValidation;

    const encryptedPassword = await hash(data.password, 10);

    const encryptedUserData: iUserRequest = {
      name: data.name,
      email: data.email,
      password: encryptedPassword,
      admin: data.admin ? data.admin : false,
    };

    const queryFormat: string = format(
      `
      INSERT INTO
      users(%I)
      VALUES(%L)
      RETURNING id, name, email, admin, active;
    `,
      Object.keys(encryptedUserData),
      Object.values(encryptedUserData)
    );

    const queryResult: QueryResult<iRetrievedUserData> = await client.query(
      queryFormat
    );

    return queryResult.rows[0];
  }
};

export { createUserService };
