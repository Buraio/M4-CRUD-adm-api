import jwt from "jsonwebtoken";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/config";
import { iRetrievedUserData } from "../interfaces/users.interface";

const getLoggedUserProfileService = async (
  userToken: string
): Promise<iRetrievedUserData> => {
  const decoded = jwt.decode(userToken);

  const queryString: string = `
    SELECT id, name, email, admin, active FROM users
    WHERE "id" = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [Number(decoded?.sub)],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export { getLoggedUserProfileService };
