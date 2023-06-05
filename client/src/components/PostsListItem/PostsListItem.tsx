// ==> Libs imports <===
import { FC } from "react";
import { AiFillEdit, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// ==> Components imports <===
import Button from "../UI/Button/Button";

// ==> Other imports <===
import { AppDispatch } from "../../redux/store";
import "./PostsListItem.scss";
import { fetchRemovePost } from "../../redux/slices/postsSlice";

interface PostsListItemProps {
  title: string;
  imageURL: string;
  views: number;
  comments?: number;
  tags?: string[];
  username: string;
  userID: string;
  postID: string;
  isEditable: boolean;
}

const PostsListItem: FC<PostsListItemProps> = ({
  comments = 0,
  imageURL,
  title,
  views,
  tags,
  username,
  userID,
  postID,
  isEditable,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onRemovePost = () => {
    console.log(postID);

    dispatch(fetchRemovePost(postID));
  };

  return (
    <div className="post">
      <div className="post__imagebox">
        {isEditable && (
          <div className="post__editbox">
            <Link to="/edit-post" className="post__edit-link">
              <AiFillEdit className="post__edit-icon" />
            </Link>
            <Button extraClassName="post__delete-button" onClick={onRemovePost}>
              <AiOutlineClose />
            </Button>
          </div>
        )}

        <Link to={`/posts/${postID}`}>
          <img src={imageURL} alt="postimage" className="post__image" />
        </Link>
      </div>
      <div className="post__textbox">
        <Link to={`/profile/${userID}`} className="post__author">
          <img src={imageURL} alt="authorIMG" className="post__author-image" />
          {username}
        </Link>

        <Link to={`/posts/${postID}`}>
          <h3 className="title post__title">{title}</h3>
        </Link>

        <div className="post__tags">
          {tags?.map((tag) => (
            <Link to="/" key={tag}>
              <div className="post__tag">#{tag}</div>
            </Link>
          ))}
        </div>
        <div className="post__info">
          <div className="post__info-block">
            <AiOutlineEye className="post__icon" />
            {views}
          </div>
          <div className="post__info-block">
            <FaComments className="post__icon" />
            {comments}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsListItem;
