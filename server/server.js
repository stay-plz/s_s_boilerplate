import "./src/config/key";
import express from "express";
import "./db";
import app from "./index";

app.listen(process.env.PORT, () => {
    console.log(`✅ ${process.env.PORT} port Server On `);
});
