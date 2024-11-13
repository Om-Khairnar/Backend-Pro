import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// here read the cors pakage its basically choose which origin specificalyy you can allow
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public")); // files folder for bulic asset of my public folder

app.use(cookieParser());
export { app };
