// ==> Libs imports <===
import { FC } from "react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
// ==> Components imports <===
import PostForm from "../../components/PostForm/PostForm";

// ==> Other imports <===
import axios from "../../utils/axios";
import { checkIsAuth } from "../../redux/slices/authSlice";
import { ISubmitFields } from "../../types/formTypes";
import "./AddPostPage.scss";
import { createNotify, notifyMode } from "../../utils/createNotify";

const AddPostPage: FC = () => {
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();

  if (!isAuth) {
    createNotify("Посты можно создавать только авторизированным пользователям", notifyMode.ERROR);
    return <Navigate to="/" />;
  }

  const onSubmit: SubmitHandler<ISubmitFields> = async ({ title, text, tags }) => {
    const tagsArray = tags.split(",").map((item) => item.trim());

    try {
      const fields = { title, text, tags: tagsArray };
      const { data } = await axios.post("/posts", fields);
      const postID = data._id;

      navigate(`/posts/${postID}`);
    } catch (error) {
      const err = error as Error;
      console.log(`AddPostPage-onSubmit error: ${err.message}`);
    }
  };

  return (
    <section className="add-post">
      <div className="container">
        <div className="add-post__wrapper">
          <h1 className="title add-post__title">Создание статьи</h1>
          <PostForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};

export default AddPostPage;
