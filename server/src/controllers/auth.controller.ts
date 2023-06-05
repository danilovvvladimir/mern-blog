import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";

import UserSchema from "../models/userModel.js";
import mongoose from "mongoose";

// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // Checkign for existing
    const isUsed = await UserSchema.findOne({ username });
    if (isUsed) {
      return res.status(409).json({ message: "Данный username уже занят." });
    }
    //

    // Hashing Password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    //

    const newUser = new UserSchema({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: passwordHash,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );

    res.status(201).json({
      newUser,
      message: "Регистрация прошла успешно.",
      token,
    });
  } catch (error) {
    const err = error as Error;
    console.log(`register error: ${err.message}`);

    res.status(500).json({ message: "Ошибка при регистрации." });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Checking for existing
    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Неправильный Логин или пароль" });
    }
    //

    // Checking password correctness
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Неправильный логин или Пароль" });
    }
    //

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );

    res.json({
      token,
      user,
      message: "Вы вошли в систему!",
    });
  } catch (error) {
    const err = error as Error;
    console.log(`login error: ${err.message}`);

    res.status(400).json({
      message: "Не удалось авторизоваться",
    });
  }
};

// Get User
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await UserSchema.findById(res.locals.jwt.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );

    res.json({ user, token });
  } catch (error) {
    const err = error as Error;
    console.log(`getMe error: ${err.message}`);

    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

// Get User
export const getUser = async (req: Request, res: Response) => {
  try {
    const userID = req.params.id;

    const user = await UserSchema.findById(userID).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    res.json(user);
  } catch (error) {
    const err = error as Error;
    console.log(`getUser error: ${err.message}`);

    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
