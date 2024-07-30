import userController from "../controller/user-controller.js"
import express from "express";



const publicRouter = new express.Router();

publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

export {
    publicRouter
}