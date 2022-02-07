import express from "express";
import {
    getLogin,
    getRegister,
    home,
    postLogin,
    postRegister,
    getAuth,
    postLogout,
} from "../controller/rootController";
import { authentication } from "../middlewares/middleswares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/api/users/register").get(getRegister).post(postRegister);
rootRouter.route("/api/users/login").get(getLogin).post(postLogin);
rootRouter.get("/api/users/auth", authentication, getAuth);
rootRouter.post("/api/users/logout", authentication, postLogout);
rootRouter.get("/api/axiosTest", (req, res) => res.send("안녕하세요 axios Test 입니다. "));

export default rootRouter;
