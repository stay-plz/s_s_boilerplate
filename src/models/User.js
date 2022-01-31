import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import res from "express/lib/response";

const userSchema = mongoose.Schema({
    name: { type: String, maxlength: 20 },
    email: { type: String, trim: true, unique: true },
    password: { type: String, minglength: 5 },
    role: { type: Number, default: 0 },
    image: { type: String },
    token: { type: String },
    tokenExp: { type: Number },
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

userSchema.methods.generateWebToken = async function () {
    try {
        const token = jwt.sign(this._id.toHexString(), process.env.tokenSeceretKey);
        this.token = token;
        const result = await this.save();
        return true;
    } catch (err) {
        throw new Error(`${err} failed to generate Web Token`);
    }
};

userSchema.statics.findByToken = async function (clientToken) {
    try {
        //decode
        const decodedToken = await jwt.verify(clientToken, process.env.tokenSeceretKey);
        const user = await this.findOne({ _id: decodedToken, token: clientToken });
        return user;
    } catch (err) {
        throw new Error(`${err} failed to verify client token`);
    }
};

const User = mongoose.model("User", userSchema);

export default User;
