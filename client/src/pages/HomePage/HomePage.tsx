// ==> Libs imports <===
import { FC } from "react";
import AsideFilter from "../../components/AsideFilter/AsideFilter";
import PostsList from "../../components/PostsList/PostsList";
// ==> Components imports <===

// ==> Other imports <===
import "./HomePage.scss";

const HomePage: FC = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="home__wrapper">
          <PostsList />
          <AsideFilter />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
