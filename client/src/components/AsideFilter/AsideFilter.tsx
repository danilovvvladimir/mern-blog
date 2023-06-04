// ==> Libs imports <===
import { FC } from "react";
import { Link } from "react-router-dom";
// ==> Components imports <===
import Button from "../UI/Button/Button";

// ==> Other imports <===
import "./AsideFilter.scss";

const AsideFilter: FC = () => {
  return (
    <div className="aside-filter">
      <div className="aside-filter__tags">
        <ul className="aside-filter__tags-list">
          <h3 className="title aside-filter__title">Популярные тэги:</h3>
          <li className="aside-filter__tags-list-item">
            <Button extraClassName="aside-filter__button">
              <h4 className="aside-filter__tag-title">#hello</h4>
            </Button>
          </li>
          <li className="aside-filter__tags-list-item">
            <Button extraClassName="aside-filter__button">
              <h4 className="aside-filter__tag-title">#hello</h4>
            </Button>
          </li>
          <li className="aside-filter__tags-list-item">
            <Button extraClassName="aside-filter__button">
              <h4 className="aside-filter__tag-title">#hello</h4>
            </Button>
          </li>
        </ul>
      </div>
      <div className="aside-filter__search">
        <input type="text" className="aside-filter__search-input" placeholder="Поиск..." />
      </div>
      <div className="aside-filter__linkbox">
        <Link to="/about" className="aside-filter__link">
          Создать пост
        </Link>
      </div>
    </div>
  );
};

export default AsideFilter;
