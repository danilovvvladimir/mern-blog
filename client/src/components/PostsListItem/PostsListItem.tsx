// ==> Libs imports <===
import { FC } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
// ==> Components imports <===

// ==> Other imports <===
import "./PostsListItem.scss";

interface PostsListItemProps {
  title: string;
  imageURL: string;
  views: number;
  comments: number;
}

const PostsListItem: FC<PostsListItemProps> = ({ comments, imageURL, title, views }) => {
  return (
    <div className="post">
      <div className="post__imagebox">
        <img src={imageURL} alt="postimage" className="post__image" />
      </div>
      <div className="post__textbox">
        <Link to="/about" className="post__author">
          <img src={imageURL} alt="authorIMG" className="post__author-image" />
          Vladimir Danilov
        </Link>

        <Link to="/about">
          <h3 className="title post__title">{title}</h3>
        </Link>

        <div className="post__tags">
          <Link to="/">
            <div className="post__tag">#universe</div>
          </Link>
          <Link to="/">
            <div className="post__tag">#space</div>
          </Link>
          <Link to="/">
            <div className="post__tag">#physics</div>
          </Link>
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
