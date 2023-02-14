import pg from "pg";
import "dotenv/config";

export const client = new pg.Client({
  user: "Buraio",
  host: "localhost",
  database: "developer_projects_db",
  password: "@Buraio15",
  port: 5432,
});

export const startDatabase = async () => {
  await client.connect();
  console.log("Database connected!");
};
