import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import morgan from "morgan";
import flash from "connect-flash";
import sessionConfig from "./config/session.js";
import connectDB from "./config/db.js";
import createError from "http-errors";
import expressLayouts from "express-ejs-layouts";
import logger from "morgan";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(sessionConfig)
app.use(flash());

connectDB();

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // logs detallados en desarrollo
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;