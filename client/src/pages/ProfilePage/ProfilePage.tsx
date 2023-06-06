// ==> Libs imports <===
import { FC, useEffect, useState } from "react";

// ==> Components imports <===
import PostListSkeleton from "../../components/PostsListItem/PostListSkeleton";

// ==> Other imports <===

import axios from "../../utils/axios";
import profileIMG from "../../assets/images/postIMG.jpg";
import "./ProfilePage.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUser } from "../../redux/slices/usersSlice";
import Spinner from "../../components/UI/Spinner/Spinner";
import { authFetchStatus } from "../../types/authTypes";
import { intitialPostInfo, IPostInfo } from "../../types/postsTypes";
import PostsListItem from "../../components/PostsListItem/PostsListItem";

const ProfilePage: FC = () => {
  const userID = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [posts, setPosts] = useState<IPostInfo[]>([intitialPostInfo]);

  const { postsIDs, registerAt, status, username } = useSelector((state: RootState) => state.users);
  // console.log(userID);
  //  console.log({ postsIDs, registerAt, status, userID, username });

  const registerAtData = new Date(registerAt);

  const getUserPosts = async () => {
    try {
      const response = await axios.get(`/users/posts/${userID}`);
      const data: IPostInfo[] = response.data;
      setPosts(data);
      return data;
    } catch (error) {
      const err = error as Error;
      console.log(`ProfilePage-getUserPosts error: ${err.message}`);
      return [intitialPostInfo];
    }
  };

  useEffect(() => {
    try {
      if (!userID) {
        return navigate("/");
      }
      dispatch(getUser(userID));

      getUserPosts();
      console.log("POSTS: ", posts);
    } catch (error) {}
  }, []);

  if (status === authFetchStatus.LOADING) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }
  console.log("POSTS: ", posts);

  return (
    <section className="profile">
      <div className="container">
        <div className="profile__wrapper">
          <div className="profile__info">
            <div className="profile__info-imagebox">
              <img src={profileIMG} alt="profile" className="profile__info-image" />
            </div>
            <div className="profile__info-text">
              <h3 className="profile__info-title">{username}</h3>
              <div className="profile__registerAt">
                Зарегистрирован: <span>{registerAtData.toLocaleDateString()}</span>
              </div>
              <div className="profile__posts-amount">
                Всего постов выложено: <span>{postsIDs.length}</span>
              </div>
            </div>
          </div>
          <div className="profile__posts">
            {posts.length === 0 ? (
              <h2>У данного пользователя ещё нет постов</h2>
            ) : (
              posts.map((item) => (
                <PostsListItem
                  key={item.postID + item.userID}
                  title={item.title}
                  views={item.views}
                  imageURL={profileIMG}
                  tags={item.tags}
                  userID={item.userID}
                  username={item.username}
                  postID={item.postID}
                  createdAt={"s"}
                  updatedAt={"10"}
                  isEditable={userID === item.userID}
                />
              ))
            )}

            {/* {[...new Array(5)].map((_, index) => (
              <PostListSkeleton className="post__skeleton" key={index} />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
