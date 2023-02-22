import { QueryConfig } from "pg";
import { client } from "../database/config";

const disableUserAccountService = async (userId: number) => {
  const queryString = `
    UPDATE users
    SET "active" = FALSE
    WHERE "id" = $1 AND "active" = TRUE;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);
};

export { disableUserAccountService };
