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
    postUploadFiles,
    postThumbnail,
    postUploadVideo,
    postgetVideos,
    postgetVideoDetail,
    postSubscribeNumber,
    postSubscribed,
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
rootRouter.post("/api/video/uploadfiles" , postUploadFiles);
rootRouter.post("/api/video/thumbnail" , postThumbnail);
rootRouter.post("/api/video/uploadVideo" , postUploadVideo);
rootRouter.post("/api/video/getVideos" , postgetVideos);
rootRouter.post("/api/video/getVideoDetail" , postgetVideoDetail);
rootRouter.post("/api/subscribe/subscribeNumber" , postSubscribeNumber);
rootRouter.post("/api/subscribe/subscribed" , postSubscribed);


export default rootRouter;
