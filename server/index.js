//dependencies
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

//path
import rootRouter from "./src/routes/rootRouter";
const app = express();

//morgan
app.use(morgan("dev"));
// application/json
app.use(express.json());
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//cookie-parser
app.use(cookieParser());

app.use("/", rootRouter);

export default app;
