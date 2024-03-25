import express from "express";
import routerUser from "./user.js";
import routerAuth from "./auth.js";
import upImages from "./upImages.js";

const Router = express.Router();

Router.use("/users", routerUser);
Router.use("/", routerAuth);
Router.use("/", upImages);
export default Router;
