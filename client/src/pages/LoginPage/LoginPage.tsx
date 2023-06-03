// ==> Libs imports <===
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// ==> Components imports <===
import Button from "../../components/UI/Button/Button";
import { loginUser } from "../../redux/slices/authSlice";
// ==> Other imports <===
import { AppDispatch } from "../../redux/store";
import "./LoginPage.scss";

interface ILoginField {
  username: string;
  password: string;
}

const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginField>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<ILoginField> = ({ username, password }) => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <section className="login">
      <div className="container">
        <h1 className="title login__title">Авторизация</h1>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__form-info">
            <label className="login__form-label">
              <div className="login__form-label-message">Username:</div>
              <input
                className="login__form-input"
                {...register("username", { required: true })}
                placeholder="Введите username..."
              />
            </label>
            <label className="login__form-label">
              <div className="login__form-label-message">Password:</div>
              <input
                className="login__form-input"
                {...register("password", { required: true })}
                placeholder="Введите пароль..."
              />
            </label>
          </div>
          <div className="login__form-buttons">
            <Button isSubmit extraClassName="login__form-button">
              Войти
            </Button>
            <Link className="login__form-register-link" to="/auth/register">
              Создать аккаунт
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
