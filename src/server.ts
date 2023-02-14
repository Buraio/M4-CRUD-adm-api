import app from "./app";
import { startDatabase } from "./database/config";

const port: number = 3000;

app.listen(port, async () => {
  await startDatabase();
  console.log(`Server is running on port ${port}`);
});
