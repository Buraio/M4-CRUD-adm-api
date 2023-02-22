import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/config";

const listAllUsersService = async () => {
  const queryString = `
    SELECT * FROM users;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows;
};

export { listAllUsersService };
