// ==> Libs imports <===
import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
// ==> Components imports <===
import Button from "../UI/Button/Button";

// ==> Other imports <===
import "./Menu.scss";

type ActiveProps = {
  isActive: boolean;
};

const Menu: FC = () => {
  const isAuth = true;

  const setActive = ({ isActive }: ActiveProps): string => {
    console.log(isActive);

    return isActive ? "menu__list-item-link menu__list-item-link--active" : "menu__list-item-link";
  };

  return (
    <header className="header">
      <div className="container">
        <div className="menu">
          <Link to="/" className="logo">
            BLOG
          </Link>
          {isAuth && (
            <nav className="menu">
              <ul className="menu__list">
                <li className="menu__list-item">
                  <NavLink to="/" className={setActive}>
                    Главная
                  </NavLink>
                </li>
                <li className="menu__list-item">
                  <NavLink to="/profile" className={setActive}>
                    Мой профиль
                  </NavLink>
                </li>
                <li className="menu__list-item">
                  <NavLink to="/about" className={setActive}>
                    Про нас
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}

          <Button extraClassName="menu__button">{isAuth ? "Выйти" : "Войти"}</Button>
        </div>
      </div>
    </header>
  );
};

export default Menu;
