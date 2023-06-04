// ==> Libs imports <===
import { FC } from "react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
// ==> Components imports <===
import Button from "../../components/UI/Button/Button";

// ==> Other imports <===
import axios from "../../utils/axios";
import { checkIsAuth } from "../../redux/slices/authSlice";
import "./AddPostPage.scss";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

interface ISubmitFields {
  title: string;
  text: string;
  tags: string;
}

const AddPostPage: FC = () => {
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISubmitFields>();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit: SubmitHandler<ISubmitFields> = async ({ title, text, tags }) => {
    const tagsArray = tags.split(",").map((item) => item.trim());
    //console.log(title, text, tagsArray);

    try {
      const fields = { title, text, tags: tagsArray };
      const { data } = await axios.post("/posts", fields);
      const postID = data._id;

      reset();
      navigate(`/posts/${postID}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="add-post">
      <div className="container">
        <div className="add-post__wrapper">
          <h1 className="title add-post__title">Создание статьи</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="add-post__form">
            <label className="add-post__form-label">
              <h3 className="add-post__form-label-title">Название:</h3>
              <input
                {...register("title", {
                  required: { value: true, message: "Статья должна иметь название." },
                  minLength: {
                    value: 5,
                    message: "Название статьи должно иметь минимум 5 символов",
                  },
                })}
                type="text"
                className="add-post__form-input"
                placeholder="Название статьи..."
              />
              {errors.title?.message && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
            </label>
            <label className="add-post__form-label">
              <h3 className="add-post__form-label-title">Текст:</h3>
              <textarea
                {...register("text", {
                  required: { value: true, message: "Статья должна иметь текст описания." },
                  minLength: {
                    value: 5,
                    message: "Текст описания статьи должен иметь минимум 5 символов",
                  },
                })}
                className="add-post__form-textarea"
                placeholder="Текст статьи..."
              />
              {errors.text?.message && <ErrorMessage>{errors.text?.message}</ErrorMessage>}
            </label>
            <label className="add-post__form-label">
              <h3 className="add-post__form-label-title">Тэги:</h3>
              <input
                {...register("tags")}
                type="text"
                className="add-post__form-input"
                placeholder="Введите теги статьи через запятую..."
              />
              {errors.tags?.message && <ErrorMessage>{errors.tags?.message}</ErrorMessage>}
            </label>
            <Button isSubmit extraClassName="add-post__button">
              Создать статью
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddPostPage;
