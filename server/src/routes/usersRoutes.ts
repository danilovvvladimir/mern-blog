import express, { NextFunction } from "express";
import { getUser, getUserPosts } from "../controllers/users.controller.js";

const usersRouter = express.Router();

// Find User By ID
usersRouter.get("/:id", getUser);
usersRouter.get("/posts/:id", getUserPosts);

export default usersRouter;
