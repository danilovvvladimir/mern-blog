import express, { NextFunction, Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  getLastTags,
  getOnePost,
  removePost,
  updatePost,
} from "../controllers/posts.controller.js";
import { checkAuth } from "../utils/checkAuth.js";

import multer from "multer";

const postsRouter = express.Router();

const storage = multer.diskStorage({
  // Когда будет любой файл загружаться, будет функция
  // которая вернет путь файла
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

postsRouter.post("/upload", checkAuth, upload.single("image"), (req: Request, res: Response) => {
  res.json({
    url: `/uploads/${req.body.file.originalname}`,
  });
});

// Create Post
postsRouter.post("/", checkAuth, createPost);

// Get One Post
postsRouter.get("/:id", getOnePost);

// Remove One post
postsRouter.delete("/:id", checkAuth, removePost);

// Update One post
postsRouter.patch("/:id", checkAuth, updatePost);

// Get Tags
postsRouter.get("/tags", getLastTags);

// Get All Posts
postsRouter.get("/", getAllPosts);

export default postsRouter;
