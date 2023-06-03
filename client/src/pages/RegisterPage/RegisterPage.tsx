// ==> Libs imports <===
import { PayloadAction } from "@reduxjs/toolkit";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
// ==> Components imports <===
import Button from "../../components/UI/Button/Button";

// ==> Other imports <===
import { checkIsAuth, registerUser } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import { ILoginField, ReturnedValues } from "../../types/authTypes";
import "./RegisterPage.scss";

interface registerResponse {
  payload: {
    token: string;
  };
}

const RegisterPage: FC = () => {
  const isAuth = useSelector(checkIsAuth);
  console.log("Register isAuth:", isAuth);

  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginField>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<ILoginField> = async ({ username, password }) => {
    const result = await dispatch(registerUser({ username, password }));

    if (registerUser.fulfilled.match(result)) {
      const data = result.payload;
      if ("token" in data) {
        window.localStorage.setItem("token", data.token);
      }
      // Добавить в toastify success
    } else {
      // Добавить в toastify
      return console.log("Ошибка при регистрации:", result.payload);
    }
    reset();
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <section className="login">
      <div className="container">
        <h1 className="title login__title">Регистрация</h1>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__form-info">
            <label className="login__form-label">
              <div className="login__form-label-message">Username:</div>
              <input
                className="login__form-input"
                {...register("username", {
                  required: { value: true, message: "Введите username" },
                  minLength: { value: 5, message: "Минимум 5 символов в username" },
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
                  minLength: { value: 8, message: "Минимум 8 символов в пароле" },
                })}
                placeholder="Введите пароль..."
              />
              {errors.password?.message && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
            </label>
          </div>
          <div className="login__form-buttons">
            <Button isSubmit extraClassName="login__form-button">
              Зарегестрироваться
            </Button>
            <Link className="login__form-register-link" to="/auth/login">
              Уже есть аккаунт?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
