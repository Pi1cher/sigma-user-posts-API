import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { config } from "./configs/config";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/authRouter";
import { postRouter } from "./routers/postRouter";
import { userRouter } from "./routers/userRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message ?? "Something went wrong";

    res.status(status).json({ status, message });
  },
);
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

app.listen(config.APP_PORT, async () => {
  await mongoose.connect(config.MONGO_URL);
  console.log(`Server has started on PORT ${config.APP_PORT}`);
});
