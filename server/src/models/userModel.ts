import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  //posts: PostDocument["_id"][];
}

//export interface UserModel extends mongoose.Model<IUser> {}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // posts: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Post",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
