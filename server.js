import "./src/config/key";
import express from "express";
import "./db";
import app from "./index";

const port = 4000;

app.listen(port, () => {
    console.log(`✅ ${port} port Server On `);
});
