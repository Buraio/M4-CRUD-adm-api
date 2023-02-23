import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/config";

const recoverUserAccountService = async (userId: number): Promise<void> => {
  const queryString: string = `
    UPDATE users
    SET "active" = TRUE
    WHERE "id" = $1 AND "active" = FALSE
    RETURNING id, name, email, admin, active;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export { recoverUserAccountService };
