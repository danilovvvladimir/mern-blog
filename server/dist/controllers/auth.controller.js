var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserSchema from "../models/userModel.js";
import mongoose from "mongoose";
// Register user
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Checkign for existing
        const isUsed = yield UserSchema.findOne({ username });
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
        yield newUser.save();
        const token = jwt.sign({
            _id: newUser._id,
        }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        res.status(201).json({
            newUser,
            message: "Регистрация прошла успешно.",
            token,
        });
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        res.status(500).json({ message: "Ошибка при регистрации." });
    }
});
// Login user
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Checking for existing
        const user = yield UserSchema.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Неправильный Логин или пароль" });
        }
        //
        // Checking password correctness
        const isPasswordCorrect = yield bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Неправильный логин или Пароль" });
        }
        //
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        res.json({
            token,
            user,
            message: "Вы вошли в систему!",
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Не удалось авторизоваться",
        });
    }
});
// Get User
export const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema.findById(res.locals.jwt._id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        res.json({ user, token });
        console.log({ user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Нет доступа",
        });
    }
});
