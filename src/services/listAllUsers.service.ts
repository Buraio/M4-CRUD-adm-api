import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/config";
import { iRetrievedUserData } from "../interfaces/users.interface";

const listAllUsersService = async (): Promise<iRetrievedUserData[]> => {
  const queryString: string = `
    SELECT * FROM users;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows;
};

export { listAllUsersService };
