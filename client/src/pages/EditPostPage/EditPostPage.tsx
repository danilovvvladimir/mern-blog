// ==> Libs imports <===
import { FC, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ISubmitFields } from "../../types/formTypes";
// ==> Components imports <===
import PostForm from "../../components/PostForm/PostForm";

// ==> Other imports <===
import axios from "../../utils/axios";
import "./EditPostPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createNotify, notifyMode } from "../../utils/createNotify";
import Spinner from "../../components/UI/Spinner/Spinner";
import { authFetchStatus } from "../../types/authTypes";

interface EditPostPageProps {}

const EditPostPage: FC<EditPostPageProps> = () => {
  const { user, status } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const postID = useParams().id;

  const onSubmit: SubmitHandler<ISubmitFields> = async ({ title, text, tags }) => {
    const tagsArray = tags.split(",").map((item) => item.trim());

    try {
      const fields = { title, text, tags: tagsArray };
      await axios.patch(`/posts/${postID}`, fields);

      navigate(`/posts/${postID}`);
    } catch (error) {
      const err = error as Error;
      console.log(`EditPostPage-onSubmit error: ${err.message}`);
    }
  };

  useEffect(() => {
    const isAuthor = async () => {
      try {
        const response = await axios.get(`/posts/${postID}`);
        const authorID = await response.data.userID;

        return authorID === user._id;
      } catch (error) {
        const err = error as Error;
        console.log(`FullPostPage-fetchOnePost error: ${err.message}`);
        return false;
      }
    };

    isAuthor().then((res) => {
      if (!res) {
        navigate("/");
        createNotify(
          "Вы не являетесь автором этого поста, чтобы его редактировать",
          notifyMode.ERROR
        );
      }
    });
  }, []);

  if (status === authFetchStatus.LOADING) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  if (status === authFetchStatus.FAILURE) {
    createNotify("Вы не являетесь автором этого поста, чтобы его редактировать", notifyMode.ERROR);
    return <Navigate to="/" />;
  }

  return (
    <section className="add-post">
      <div className="container">
        <div className="add-post__wrapper">
          <h1 className="title add-post__title">Редактирование статьи</h1>
          <PostForm onSubmit={onSubmit} postID={postID} />
        </div>
      </div>
    </section>
  );
};

export default EditPostPage;
