import express from "express";
import {
    getLogin,
    getRegister,
    home,
    postLogin,
    postRegister,
    getAuth,
    postLogout,
    postFavoriteNumber,
    postFavorited,
    postaddFavorite,
    postRemoveFavorite,
    postGetFavoriteMovie,
} from "../controller/rootController";
import { authentication } from "../middlewares/middleswares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/api/users/register").get(getRegister).post(postRegister);
rootRouter.route("/api/users/login").get(getLogin).post(postLogin);
rootRouter.get("/api/users/auth", authentication, getAuth);
rootRouter.post("/api/users/logout", authentication, postLogout);
rootRouter.post("/api/favorite/favoriteNumber" , postFavoriteNumber);
rootRouter.post("/api/favorite/favorited" , postFavorited);
rootRouter.post("/api/favorite/removeFavorite" , postRemoveFavorite);
rootRouter.post("/api/favorite/addFavorite" , postaddFavorite);
rootRouter.post("/api/favorite/getFavoriteMovie" , postGetFavoriteMovie);

export default rootRouter;
