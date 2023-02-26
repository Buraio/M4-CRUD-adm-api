import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";
import {
  iRetrievedUserData,
} from "../interfaces/users.interface";
import { ZodError } from "zod";
import { updateUserRequest, updateUserSchema } from "../schemas/updateUser.schema";

const updateUserAccountService = async (
  userId: number,
  userRequestBody: updateUserRequest
  ): Promise<iRetrievedUserData> => {
  console.log(userRequestBody)
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
