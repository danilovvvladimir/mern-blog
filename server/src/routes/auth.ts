import express from "express";

const userRouter = express.Router();

userRouter.get("/login", (request, response) => {
  console.log("login req");

  response.write("Login!");
});

userRouter.get("/register", (request, response) => {
  console.log("register req");
  response.write("register!");
});

export default userRouter;
