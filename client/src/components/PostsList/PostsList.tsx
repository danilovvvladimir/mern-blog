// ==> Libs imports <===
import { FC } from "react";
import PostsListItem from "../PostsListItem/PostsListItem";
// ==> Components imports <===

// ==> Other imports <===
import postIMG from "../../assets/images/postIMG.jpg";
import "./PostsList.scss";

const PostsList: FC = () => {
  return (
    <div className="posts home__posts">
      <PostsListItem imageURL={postIMG} comments={2} views={10} title="Программируя Вселенную" />
      <PostsListItem imageURL={postIMG} comments={2} views={10} title="Программируя Вселенную" />
      <PostsListItem imageURL={postIMG} comments={2} views={10} title="Программируя Вселенную" />
    </div>
  );
};

export default PostsList;
