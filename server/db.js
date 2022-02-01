import mongoose from "mongoose";

mongoose.connect(process.env.mongoURI);

const db = mongoose.connection;

db.on("error", (error) => console.log(`DB ERROR ${error}`));
db.once("open", () => console.log("✅ Connected to DB"));
