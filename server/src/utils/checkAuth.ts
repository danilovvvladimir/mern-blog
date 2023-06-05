import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      // Decoding user
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      res.locals.jwt = decoded;
      next();
    } catch (error) {
      const err = error as Error;
      console.log(`checkAuth error:${err.message}`);

      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(401).json({
      message: "Не авторизован",
    });
  }
};
