// ==> Libs imports <===
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
// ==> Components imports <===
import AsideFilter from "../../components/AsideFilter/AsideFilter";
import PostsList from "../../components/PostsList/PostsList";

// ==> Other imports <===
import { AppDispatch } from "../../redux/store";
import { fetchLatestTags, fetchPosts } from "../../redux/slices/postsSlice";
import "./HomePage.scss";

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchLatestTags());
  }, []);

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
