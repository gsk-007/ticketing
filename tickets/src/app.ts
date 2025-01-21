import express from "express";
import "express-async-errors";
import { errorHandler, NotFoundError } from "@gsktickets/common";
import cookieSession from "cookie-session";

import { createTicketRouter } from "./routes/new";

const app = express();

app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(createTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
