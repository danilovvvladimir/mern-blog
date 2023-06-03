// ==> Libs imports <===
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
// ==> Components imports <===

// ==> Other imports <===
import "./RegisterPage.scss";

interface ILoginField {
  username: string;
  password: string;
}

const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginField>();

  const onSubmit: SubmitHandler<ILoginField> = (values) => {
    console.log(values);
  };

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
