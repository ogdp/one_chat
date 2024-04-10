import express from "express";
import routerUser from "./user.js";
import routerAuth from "./auth.js";
import routerMessage from "./message.js";
import routerChat from "./chat.js";
import upImages from "./upImages.js";

const Router = express.Router();

Router.use("/users", routerUser);
Router.use("/", routerAuth);
Router.use("/messages", routerMessage);
Router.use("/chat", routerChat);
Router.use("/", upImages);
export default Router;
