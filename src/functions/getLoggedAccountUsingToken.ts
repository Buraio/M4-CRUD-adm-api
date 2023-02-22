import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database/config";
import { getDecodedToken } from "./getDecodedToken";

const getLoggedAccountUsingToken = async (
  authorization: string | undefined
) => {
  const decodedToken = getDecodedToken(authorization);

  const queryFormat = format(
    `
    SELECT * FROM users
    WHERE "id" = $1
    `
  );

  const queryResult: QueryResult = await client.query(queryFormat, [
    Number(decodedToken?.sub),
  ]);

  return {
    result: queryResult.rows[0],
    decodedToken: decodedToken,
  };
};

export { getLoggedAccountUsingToken };
