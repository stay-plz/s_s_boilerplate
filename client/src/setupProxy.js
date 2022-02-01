// import { createProxyMiddleware } from "http-proxy-middleware";

// export const setUpProxy = (app) => {
//     app.use(
//         "/api",
//         createProxyMiddleware({
//             target: "http://localhost:4000",
//             changeOrigin: true,
//         })
//     );
// };

// export default setUpProxy;
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:4000",
            changeOrigin: true,
        })
    );
};
