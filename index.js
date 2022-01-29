//dependencies
import express from "express";
import morgan from "morgan";

//path
import rootRouter from "./src/routes/rootRouter";

const app = express();

app.use(morgan("dev"));
// application/json
app.use(express.json());
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
export default app;
