import express, { NextFunction } from "express";
import { getUser } from "../controllers/users.controller.js";

const usersRouter = express.Router();

// Find User By ID
usersRouter.get("/:id", getUser);

export default usersRouter;
