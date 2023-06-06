// ==> Libs imports <===
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// ==> Components imports <===
import Button from "../UI/Button/Button";

// ==> Other imports <===
import { checkIsAuth, logout } from "../../redux/slices/authSlice";
import "./Menu.scss";
import { createNotify, notifyMode } from "../../utils/createNotify";
import { RootState } from "../../redux/store";

type ActiveProps = {
  isActive: boolean;
};

const Menu: FC = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const setActive = ({ isActive }: ActiveProps): string => {
    return isActive ? "menu__list-item-link menu__list-item-link--active" : "menu__list-item-link";
  };

  const handleLogout = () => {
    createNotify("Вы успешно вышли из аккаунта", notifyMode.SUCCESS);
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="menu">
          <Link to="/" className="logo">
            BLOG
          </Link>
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__list-item">
                <NavLink to="/" className={setActive}>
                  Главная
                </NavLink>
              </li>
              {isAuth && (
                <li className="menu__list-item">
                  <NavLink to={`/profile/${user?._id}`} className={setActive}>
                    Мой профиль
                  </NavLink>
                </li>
              )}

              <li className="menu__list-item">
                <NavLink to="/about" className={setActive}>
                  Про нас
                </NavLink>
              </li>
            </ul>
          </nav>

          {isAuth ? (
            <Button onClick={handleLogout}>Выйти</Button>
          ) : (
            <Link to="/auth/login" className="menu__login-button">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Menu;
