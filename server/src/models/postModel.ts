import mongoose from "mongoose";

export interface IPost extends mongoose.Document {
  username: string;
  userID: string;
  title: string;
  text: string;
  imageURL: string;
  tags: string[];
  views: number;
  // author: any;
  // comments: any[];
}

const PostSchema: mongoose.Schema = new mongoose.Schema(
  {
    username: { type: String },
    userID: { type: String },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default: "",
    },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPost>("Post", PostSchema);
