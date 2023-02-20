import { hash } from "bcryptjs";
import { QueryResult } from "pg";
import format from "pg-format";
import { z } from "zod";
import { client } from "../database/config";
import { iCreateUserRequest } from "../interfaces/users.interface";
import { createUserSchema } from "../schemas/createUser.schema";

const createUserService = async (userData: iCreateUserRequest) => {
  const requestObjValidation = createUserSchema.safeParse(userData);

  if (!requestObjValidation.success) {
    const error = requestObjValidation.error;
    throw new z.ZodError(error.issues);
  } else {
    const { data } = requestObjValidation;

    const encryptedPassword = await hash(data.password, 10);

    const encryptedUserData: iCreateUserRequest = {
      name: data.name,
      email: data.email,
      password: encryptedPassword,
      admin: data.admin,
    };

    const queryString: string = format(
      `
      INSERT INTO
      users(%I)
      VALUES(%L)
      RETURNING id, name, email, admin, active;
    `,
      Object.keys(encryptedUserData),
      Object.values(encryptedUserData)
    );

    const queryResult: QueryResult = await client.query(queryString);

    return queryResult.rows[0];
  }
};

export { createUserService };
