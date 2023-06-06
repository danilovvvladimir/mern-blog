// ==> Libs imports <===
import { FC } from "react";
import PostsListItem from "../PostsListItem/PostsListItem";
// ==> Components imports <===
import PostListSkeleton from "../PostsListItem/PostListSkeleton";

// ==> Other imports <===
import postIMG from "../../assets/images/postIMG.jpg";
import "./PostsList.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { authFetchStatus } from "../../types/authTypes";

const PostsList: FC = () => {
  const { items, status } = useSelector((state: RootState) => state.posts.posts);
  const user = useSelector((state: RootState) => state.auth.user);

  if (status === authFetchStatus.LOADING) {
    return (
      <div className="posts home__posts">
        {[...new Array(5)].map((_, index) => (
          <PostListSkeleton className="post__skeleton" key={index} />
        ))}
      </div>
    );
  }

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
          createdAt={item.createdAt}
          updatedAt={item.updatedAt}
          isEditable={user !== null && user._id === item.userID}
        />
      ))}
    </div>
  );
};

export default PostsList;
