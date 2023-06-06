// ==> Libs imports <===
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// ==> Components imports <===

// ==> Other imports <===
import axios from "../../utils/axios";

import { intitialPostInfo, IPostInfo } from "../../types/postsTypes";
import { authFetchStatus } from "../../types/authTypes";
import "./FullPostPage.scss";
import Spinner from "../../components/UI/Spinner/Spinner";

interface FullPostPageProps {}

const FullPostPage: FC<FullPostPageProps> = () => {
  const [postInfo, setPostInfo] = useState<IPostInfo>(intitialPostInfo);
  const postID = useParams().id;

  const fetchOnePost = async () => {
    try {
      const response = await axios.get(`/posts/${postID}`);
      const data = await response.data;
      setPostInfo({ ...data, status: authFetchStatus.SUCCESS });
      return response.data;
    } catch (error) {
      const err = error as Error;
      console.log(`FullPostPage-fetchOnePost error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchOnePost();
  }, []);

  if (postInfo.status === authFetchStatus.LOADING) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="fullpost">
      <div className="container">
        <div className="fullpost__wrapper">
          <div className="fullpost__imagebox">
            {postInfo.imageURL && (
              <img src={postInfo.imageURL} alt={postInfo.title} className="fullpost__imagebox" />
            )}
          </div>
          <div className="fullpost__textbox">
            <h1 className="fullpost__title">{postInfo.title}</h1>
            <p className="fullpost__text">{postInfo.text}</p>
          </div>
          <div className="fullpost__author">
            <Link to={`/profile/${postInfo.userID}`} className="post__author">
              {/* <img src={imageURL} alt="authorIMG" className="post__author-image" /> */}
              {postInfo.username}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullPostPage;
