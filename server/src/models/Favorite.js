import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userFrom: { type : mongoose.Schema.Types.ObjectId, ref : "User" , required : true},
    movieId : { type : String, required : true },
    movieTitle : { type : String , required : true},
    moviePost : { type : String, required : true },
    movieRunTime : { type : String, required : true},
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;