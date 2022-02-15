import User from "../models/User";
import multer from "multer";

/*
        인증처리.
        1. cookie에서 token(client)을 갖고오기 .
        2. token(client)을 decode 하여 token(server)과 비교.
        3-1. 일치하면 req에 토큰과 user 정보 보내기.
        3-2. 불일치하면 return
    */
export const authentication = async (req, res, next) => {
    try {
        const { x_auth: token } = req.cookies;
        const user = await User.findByToken(token);
        if (!user) {
            return res.json({
                isAuth: false,
                error: true,
            });
        }
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        throw new Error(`${err.message}`);
    }
};