import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, maxlength: 20 },
    email: { type: String, trim: true, unique: true },
    password: { type: String, minglength: 5 },
    role: { type: Number, default: 0 },
    image: { type: String },
    token: { type: String },
    tokenExp: { type: Number },
});

const User = mongoose.model("User", userSchema);

export default User;
