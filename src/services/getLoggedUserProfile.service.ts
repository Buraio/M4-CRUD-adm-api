import jwt from "jsonwebtoken";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/config";

const getLoggedUserProfileService = async (userToken: string) => {
  const decoded = jwt.decode(userToken);

  const queryString = `
    SELECT * FROM users
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
