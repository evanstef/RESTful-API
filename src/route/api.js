import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";


const userRouter = new express.Router();
userRouter.use(authMiddleware)

// User API
userRouter.get("/api/user/current", userController.get)
userRouter.patch("/api/user/current", userController.update)
userRouter.delete("/api/users/logout", userController.logout)

// Contact API
userRouter.post("/api/contacts", contactController.create)
userRouter.get("/api/contacts/:contactId", contactController.get)
userRouter.put("/api/contacts/:contactId", contactController.update)
userRouter.delete("/api/contacts/:contactId", contactController.remove)
userRouter.get("/api/contacts", contactController.search)

// Address API
userRouter.post("/api/contacts/:contactId/address", addressController.create)
userRouter.get("/api/contacts/:contactId/address/:addressId", addressController.get)
userRouter.put("/api/contacts/:contactId/address/:addressId", addressController.update)
userRouter.delete("/api/contacts/:contactId/address/:addressId", addressController.remove)
userRouter.get("/api/contacts/:contactId/address", addressController.list)


export {
    userRouter
}