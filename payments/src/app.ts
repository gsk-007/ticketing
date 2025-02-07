import express from "express";
import "express-async-errors";
import { errorHandler, NotFoundError, currentUser } from "@gsktickets/common";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
