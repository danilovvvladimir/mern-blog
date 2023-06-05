import { Response, Request } from "express";

import PostSchema from "../models/postModel.js";
import UserSchema from "../models/userModel.js";

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

    const post = await doc.save();

    await UserSchema.findByIdAndUpdate(userID, {
      $push: { posts: post },
    });

    res.json(post);
  } catch (error) {
    const err = error as Error;
    console.log(`CreatePost error: ${err.message}`);

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
    const err = error as Error;
    console.log(`GetLastTags error: ${err.message}`);

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
      {
        $inc: { views: 1 },
      },
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
        const err = error as Error;
        console.log(`getOnePost error:${err.message}`);

        return res.status(500).json({
          message: "Не удалось получить статью",
        });
      });
  } catch (error) {
    const err = error as Error;
    console.log(`getOnePost error: ${err.message}`);
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
    const err = error as Error;
    console.log(`getAllPosts error: ${err.message}`);

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

    await UserSchema.findByIdAndUpdate(userID, {
      $pull: { posts: postId },
    });
  } catch (error) {
    const err = error as Error;
    console.log(`removePost error: ${err.message}`);

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

    await UserSchema.findByIdAndUpdate(userID, {
      $pull: { posts: postId },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    const err = error as Error;
    console.log(`updatePost error: ${err.message}`);

    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
