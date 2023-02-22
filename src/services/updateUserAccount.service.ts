import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/config";
import { iUserRequest } from "../interfaces/users.interface";

const updateUserAccountService = async (
  userId: number,
  userRequest: iUserRequest
) => {
  const queryString = `
    UPDATE users
    SET(%I) = ROW(%L)
    WHERE "id" = $1 AND "active" = TRUE;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
  };

  const queryResult: QueryResult = await client.query(queryConfig);
};
