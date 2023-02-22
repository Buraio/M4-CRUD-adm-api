import { QueryConfig } from "pg";
import { client } from "../database/config";

const recoverUserAccountService = async (userId: number): Promise<void> => {
  const queryString: string = `
    UPDATE users
    SET "active" = TRUE
    WHERE "id" = $1 AND "active" = FALSE;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);
};

export { recoverUserAccountService };
