import User from "../models/User";
import Video from "../models/Video"
import Favorite from "../models/Favorite";
import bcrypt from "bcrypt";
import multer from "multer"
import ffmpeg from "fluent-ffmpeg";

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
};


const multerStorage = multer.diskStorage({
     destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const uploadFiles = multer({storage : multerStorage}).single("file");

export const postUploadFiles = (req, res) => {
    uploadFiles(req, res, err => {
        if(err) { 
            console.log(err); 
            return res.json({success : false , err});
        }
        return res.json({success : true, filePath : res.req.file.path , fileName : res.req.file.filename})
    })
}

export const postThumbnail = (req, res) => {
    try {
        let thumbsFilePath ="";
        let fileDuration ="";
        console.log(req.body);
        //파일정보 가져오기
        ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
            console.log(req.body.filePath);
            console.dir(metadata);
            console.log(metadata.format.duration);
    
            fileDuration = metadata.format.duration;
        })
        //썸네일 생성
        ffmpeg(req.body.filePath)
            .on('filenames', function (filenames) {
                console.log('Will generate ' + filenames.join(', '))
                thumbsFilePath = "uploads/thumbnails/" + filenames[0];
            })
            .on('end', function () {
                console.log('Screenshots taken');
                return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
            })
            .screenshots({
                // Will take screens at 20%, 40%, 60% and 80% of the video
                count: 3,
                folder: 'uploads/thumbnails',
                size:'320x240',
                // %b input basename ( filename w/o extension )
                filename:'thumbnail-%b.png'
            });

    } catch(err) {
        console.log(err);
    }

};

export const postUploadVideo = (req, res) => {
    const video = new Video(req.body);
    video.save((err, doc) => {
        if(err) return res.json({ success : false, err});
        return res.status(200).json({success : true })
    })
}

export const postgetVidoe = (req, res) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) {console.log(err);
            return res.status(400).send(err);
            }
            return res.status(200).json({ success: true, videos })
        })
}