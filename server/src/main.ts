import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Constants
const PORT = process.env.PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_DOMEN = process.env.DB_DOMEN;

// MongoDB
mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_DOMEN}/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("DB connecting error!", error);
  });

// App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", userRouter);

app.get("/", (req, res) => {
  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
