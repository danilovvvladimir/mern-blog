import express from "express";
import userRouter from "./routes/auth.js";
const app = express();
// app.use((err, res, next) => {
//   console.log(err);
//   res.status(401).send(err.message);
// });
app.use("/auth", userRouter);
app.get("/", (req, res) => {
    console.log("home req");
    res.write("homeee");
});
app.listen(7777, () => {
    console.log("Server is listening at port 7777");
});
