// ==> Libs imports <===
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// ==> Components imports <===
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../UI/Button/Button";

// ==> Other imports <===
import axios from "../../utils/axios";
import { IResponseFields, ISubmitFields } from "../../types/formTypes";
import "./PostForm.scss";

interface PostFormProps {
  onSubmit: SubmitHandler<ISubmitFields>;
  postID?: string;
}

const PostForm: FC<PostFormProps> = ({ onSubmit, postID }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitFields>({
    defaultValues: async () => {
      const response = await axios.get(`/posts/${postID}`);
      const data: IResponseFields = response.data;

      return {
        tags: data.tags.join(", "),
        text: data.text,
        title: data.title,
      };
    },
  });

  return (
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
        {postID ? "Сохранить изменения" : "Создать статью"}
      </Button>
    </form>
  );
};

export default PostForm;
