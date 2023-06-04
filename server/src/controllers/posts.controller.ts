import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";

import PostSchema from "../models/postModel.js";
import UserSchema from "../models/userModel.js";
import mongoose from "mongoose";

// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

// Create Post

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, text, imageURL, views, tags } = req.body;
    const user = await UserSchema.findById(res.locals.jwt.id);
    const username = user!.username;
    const userID = res.locals.jwt.id;
    const doc = new PostSchema({
      title,
      text,
      imageURL,
      views,
      tags,
      userID,
      username,
    });

    console.log(res.locals.jwt.id);
    console.log(user);

    const post = await doc.save();

    await UserSchema.findByIdAndUpdate(
      userID,
      // Что будем делать
      {
        $push: { posts: post },
      }
    );

    res.json(post);
  } catch (error) {
    console.log("Create Post error: ", error);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

// Get 5 tags

export const getLastTags = async (req: Request, res: Response) => {
  try {
    const posts = await PostSchema.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    const uniqueTags = Array.from(new Set(tags));

    res.json(uniqueTags);
  } catch (error) {
    console.log("Get Last Tags error: ", error);
    res.status(500).json({
      message: "Не удалось получить тэги",
    });
  }
};

export const getOnePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    PostSchema.findOneAndUpdate(
      {
        _id: postId,
      },
      // Что будем делать
      {
        $inc: { views: 1 },
      },
      // Когда будем получать статью? после изменения
      {
        returnDocument: "after",
      }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Статьи не существует",
          });
        }

        res.json(doc);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          message: "Не удалось получить статью",
        });
      });
  } catch (error) {
    console.log("Get One Post error: ", error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostSchema.find().exec();

    res.json(posts);
  } catch (error) {
    console.log("Get All Posts error: ", error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const removePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await PostSchema.findById(postId);
    const userID = post!.userID;

    PostSchema.findOneAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Статьи не существует",
          });
        }

        res.json({
          success: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          message: "Не удалось удалить статью",
        });
      });

    await UserSchema.findByIdAndUpdate(
      userID,
      // Что будем делать
      {
        $pull: { posts: postId },
      }
    );
  } catch (error) {
    console.log("Remove Post error: ", error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await PostSchema.findById(postId);

    const userID = post!.userID;
    console.log(userID);

    await PostSchema.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
      }
    );

    await UserSchema.findByIdAndUpdate(
      userID,
      // Что будем делать
      {
        $pull: { posts: postId },
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log("Update Post error: ", error);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
