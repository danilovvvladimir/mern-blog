import { Response, Request } from "express";
import UserSchema from "../models/userModel.js";

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
    console.log(user);
  } catch (error) {
    const err = error as Error;
    console.log(`getUser error: ${err.message}`);
    res.status(500).json({
      message: "Не удалось получить пользователя",
    });
  }
};
