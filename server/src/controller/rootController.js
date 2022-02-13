import User from "../models/User";
import Favorite from "../models/Favorite";
import bcrypt from "bcrypt";

export const home = (req, res) => res.send("Home Router");

export const getRegister = (req, res) => res.send("Register Router");

export const postRegister = async (req, res) => {
    try {
        const {
            body: { name, email, password },
        } = req;

        const user = new User({
            name,
            email,
            password,
        });

        const result = await user.save();

        return res.status(200).json({
            registerSuccess: true,
        });
    } catch (err) {
        return res.status(500).json({ registerSuccess: false, err });
    }
};
export const getLogin = (req, res) => res.send("getLogin");
export const postLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다.",
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다.",
            });
        }
        const isGenerate = await user.generateWebToken();
        if (!isGenerate) {
            return res.json({
                loginSuccess: false,
                message: "토큰 생성이 실패하였습니다.",
            });
        }

        return res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
    } catch (err) {
        return res.status(400).json({ loginSuccess: false, err: err.message });
    }
};

export const getAuth = (req, res) => {
    const { _id, name, email, role, image } = req.user;
    return res.status(200).json({
        _id,
        isAuth: true,
        isAdmin: role === 0 ? true : false,
        name,
        email,
        role,
        image,
    });
};

export const postLogout = async (req, res) => {
    try {
        const { _id } = req.user;
        const isUpdate = await User.findOneAndUpdate({ _id: _id }, { token: "" });
        if (!isUpdate) {
            return res.json({ logoutSuccess: false });
        }
        return res.status(200).json({ logoutSuccess: true });
    } catch (err) {
        return res.json({ logoutSuccess: false, err: err.message });
    }
};

export const postFavoriteNumber = async (req, res) => {
    try {
        const { movieId } = req.body;
        const result = await Favorite.find({ movieId : movieId});
        if(!result) {
            return res.status(400).json({success : false , err : err});
        }
        return res.status(200).json({ success : true , favoriteNumber : result.length});
    } catch(err) {
        return res.status(400).json({success : false , err : err});
    }
};

export const postFavorited = async (req, res) => {
    try{
        const {movieId , userFrom} = req.body;
        const result = await Favorite.find({ movieId : movieId , userFrom : userFrom});

        let isfavorited = false;
        if(result.length !== 0)  isfavorited = true;
        return res.status(200).json({ success : true , favorited : isfavorited})

    } catch(err) {
            return res.status(400).json({ success : false , err : err});
    }
}

export const postRemoveFavorite = async (req, res) => {
    try {
        const { userFrom, movieId } = req.body;
        await Favorite.findOneAndDelete({ movieId , userFrom});
        return res.status(200).json({ success : true });
    } catch(err) {
            return res.status(400).json({ success : false });
    }
};

export const postaddFavorite = async (req, res) => {
    try {
        const { userFrom, movieId, original_title, release_date, runtime } = req.body;
        // const favorite = new Favorite(req.body);
        // await favorite.save();
        const favorite = await Favorite.create({
            userFrom,
            movieId,
            movieTitle : original_title,
            moviePost : release_date,
            movieRunTime : runtime
        });
        if(!favorite) {
            return res.status(400).json({ success : false });
        }
        return res.status(200).json({ success : true });
    } catch(err) {
        console.log(err);
            return res.status(400).json({ success : false });
    }
};

export const postGetFavoriteMovie = async (req, res) => {
    try {
        const { userFrom : userFrom } = req.body;
        const favorites = await Favorite.find({ userFrom : userFrom});
        if(!favorites) {
            return res.status(400).json({ success : false, err })
        }
        return res.status(200).json({ success : true , favorites})
    } catch(err) {
        return res.status(400).json({ success : false , err })
    }
}