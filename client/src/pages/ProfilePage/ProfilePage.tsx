// ==> Libs imports <===
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// ==> Components imports <===
import Spinner from "../../components/UI/Spinner/Spinner";
import PostsListItem from "../../components/PostsListItem/PostsListItem";

// ==> Other imports <===
import { AppDispatch, RootState } from "../../redux/store";
import axios from "../../utils/axios";
import profileIMG from "../../assets/images/postIMG.jpg";
import { getUser } from "../../redux/slices/usersSlice";
import { authFetchStatus } from "../../types/authTypes";
import { intitialPostInfo, IPost } from "../../types/postsTypes";
import "./ProfilePage.scss";

const ProfilePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Получение 2nd ID пользователя
  const profileUserID = useParams().id as string;
  // Получение инфы от просматривающего пользователя.
  const user = useSelector((state: RootState) => state.auth.user);

  // Получение информации о 2nd пользователе
  const { postsIDs, registerAt, status, username } = useSelector((state: RootState) => state.users);
  console.log(status);

  const registerAtData = new Date(registerAt);

  const [posts, setPosts] = useState<IPost[]>([]);

  // Получение постов пользователя по 2ndID
  const getUserPosts = async () => {
    try {
      const response = await axios.get(`/users/posts/${profileUserID}`);
      const data: IPost[] = response.data;
      console.log("data:", data);

      setPosts(data);
      console.log("getUserPosts Done");
      return data;
    } catch (error) {
      const err = error as Error;
      console.log(`ProfilePage-getUserPosts error: ${err.message}`);
      return [intitialPostInfo];
    }
  };

  useEffect(() => {
    try {
      dispatch(getUser(profileUserID));

      getUserPosts();
    } catch (error) {}
  }, []);

  if (status === authFetchStatus.LOADING) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  if (status === authFetchStatus.FAILURE) {
    return (
      <div className="container">
        <h1>Не удалось найти пользователя...</h1>
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
                  key={item._id + item.userID}
                  title={item.title}
                  views={item.views}
                  imageURL={profileIMG}
                  tags={item.tags}
                  userID={item.userID}
                  username={item.username}
                  postID={item._id}
                  createdAt={"s"}
                  updatedAt={"10"}
                  isEditable={user !== null && user._id === item.userID}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
