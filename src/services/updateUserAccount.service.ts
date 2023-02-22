import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";
import { iUserRequest } from "../interfaces/users.interface";
import { updateUserSchema } from "../schemas/updateUser.schema";
import { ZodError } from "zod";

const updateUserAccountService = async (
  userId: number,
  userRequestBody: iUserRequest
) => {
  const requestObjValidation = updateUserSchema.safeParse(userRequestBody);

  if (!requestObjValidation.success) {
    const error = requestObjValidation.error;
    throw new ZodError(error.issues);
  } else {

    const queryFormat = format(
      `
      UPDATE users
      SET(%I) = ROW(%L)
      WHERE "id" = $1 AND "active" = TRUE
      RETURNING id, name, email, admin, active;
    `,
      Object.keys(requestObjValidation.data),
      Object.values(requestObjValidation.data)
    );

    const queryResult: QueryResult = await client.query(queryFormat, [userId]);

    return queryResult.rows[0];
  }
};

export { updateUserAccountService };
