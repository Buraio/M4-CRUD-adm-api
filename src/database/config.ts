import pg from "pg";
import "dotenv/config";

export const client = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.PORT!),
});

export const startDatabase = async () => {
  await client.connect();
  console.log("Database connected!");
};
