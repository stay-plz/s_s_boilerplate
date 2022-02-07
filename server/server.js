import "../setEnv";
import "./db";
import app from "./index";

app.listen(process.env.PORT, () => {
    console.log(`✅ ${process.env.PORT} port Server On `);
});
