import express from "express";
import { getRegister, home, postRegister } from "../controller/rootController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/register").get(getRegister).post(postRegister);

export default rootRouter;
