// ==> Libs imports <===
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

// ==> Components imports <===
import Button from "../../components/UI/Button/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

// ==> Other imports <===
import { checkIsAuth, loginUser } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import { ILoginField } from "../../types/authTypes";
import { createNotify, notifyMode } from "../../utils/createNotify";
import "./LoginPage.scss";

const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginField>();

  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<ILoginField> = async ({ username, password }) => {
    try {
      const result = await dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(result)) {
        const data = result.payload;
        if ("token" in data) {
          window.localStorage.setItem("token", data.token);
        }
        createNotify("Вы успешно авторизовались", notifyMode.SUCCESS);
      } else {
        createNotify("Ошибка при авторизации", notifyMode.ERROR);
      }
      reset();
    } catch (error) {
      const err = error as Error;
      console.log(`LoginPage-onSubmit error: ${err.message}`);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

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
                {...register("username", {
                  required: { value: true, message: "Введите username" },
                })}
                placeholder="Введите username..."
              />
              {errors.username?.message && <ErrorMessage>{errors.username?.message}</ErrorMessage>}
            </label>
            <label className="login__form-label">
              <div className="login__form-label-message">Password:</div>
              <input
                className="login__form-input"
                type="password"
                {...register("password", {
                  required: { value: true, message: "Введите пароль" },
                })}
                placeholder="Введите пароль..."
              />
              {errors.password?.message && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
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
