// ==> Libs imports <===
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// ==> Components imports <===
import Button from "../UI/Button/Button";
import AsideFilterTagSkeleton from "./AsideFilterTagSkeleton";

// ==> Other imports <===
import { RootState } from "../../redux/store";
import { authFetchStatus } from "../../types/authTypes";
import "./AsideFilter.scss";

const AsideFilter: FC = () => {
  const { items, status } = useSelector((state: RootState) => state.posts.tags);

  const skeletons = [...new Array(3)].map((_, index) => (
    <AsideFilterTagSkeleton className="aside-filter__tag-skeleton" key={index} />
  ));

  return (
    <div className="aside-filter">
      <div className="aside-filter__tags">
        <h3 className="title aside-filter__title">Популярные тэги:</h3>
        <ul className="aside-filter__tags-list">
          {status === authFetchStatus.LOADING
            ? skeletons
            : items.map((tag) => (
                <li className="aside-filter__tags-list-item" key={tag}>
                  <Button extraClassName="aside-filter__button">
                    <h4 className="aside-filter__tag-title">#{tag}</h4>
                  </Button>
                </li>
              ))}
        </ul>
      </div>
      <div className="aside-filter__search">
        <input type="text" className="aside-filter__search-input" placeholder="Поиск..." />
      </div>
      <div className="aside-filter__linkbox">
        <Link to="/add-post" className="aside-filter__link">
          Создать пост
        </Link>
      </div>
    </div>
  );
};

export default AsideFilter;
