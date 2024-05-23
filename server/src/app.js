import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//can also use app.use(cors()) to allow all origins
//always specify the origin of your client app in production

const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Change this to your allowed origin
  credentials: true,
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // enable pre-flight
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

import userRouter from "./routes/user.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import historyRouter from "./routes/history.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/history", historyRouter);

export { app };
