// ==> Libs imports <===
import { FC } from "react";
import PostsListItem from "../PostsListItem/PostsListItem";
// ==> Components imports <===

// ==> Other imports <===
import postIMG from "../../assets/images/postIMG.jpg";
import "./PostsList.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PostsList: FC = () => {
  const { items, status } = useSelector((state: RootState) => state.posts.posts);

  return (
    <div className="posts home__posts">
      {items.map((item) => (
        <PostsListItem
          key={item._id}
          title={item.title}
          views={item.views}
          imageURL={postIMG}
          tags={item.tags}
          userID={item.userID}
          username={item.username}
          postID={item._id}
        />
      ))}
    </div>
  );
};

export default PostsList;
