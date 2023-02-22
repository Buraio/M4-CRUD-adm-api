import "express-async-errors";
import express, { Application } from "express";
import { handleErrorsMiddleware } from "./errors";
import { loginRoutes, userRoutes } from "./routes/users.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes)

app.use(handleErrorsMiddleware);

export default app;
