import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userFrom: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    movieId : {
        type : String,
    },
    movieTitle : {
        type : String,
    },
    moviePost : {
        type : String,
    },
    movieRunTime : {
        type : String,
    },
}, { timestamps : true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;