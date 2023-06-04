import express, { NextFunction } from "express";
import { register, login, getMe, getUser } from "../controllers/auth.controller.js";
import { checkAuth } from "../utils/checkAuth.js";

const userRouter = express.Router();

// Register
userRouter.post("/register", register);

// Login
userRouter.post("/login", login);

// Get Me
userRouter.get("/me", checkAuth, getMe);

// Get User
userRouter.get("/:id", checkAuth, getUser);

export default userRouter;
