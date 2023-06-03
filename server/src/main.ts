import express from "express";
import userRouter from "./routes/auth.js";

const PORT = process.env.PORT;

const app = express();

app.use("/auth", userRouter);

app.get("/", (req, res) => {
  console.log("home req");

  res.write("homeee");
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
