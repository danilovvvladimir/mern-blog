// ==> Libs imports <===
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsideFilter from "../../components/AsideFilter/AsideFilter";
import PostsList from "../../components/PostsList/PostsList";
import { fetchPosts } from "../../redux/slices/postsSlice";
import { AppDispatch, RootState } from "../../redux/store";
// ==> Components imports <===

// ==> Other imports <===
import "./HomePage.scss";

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.posts.posts);
  useEffect(() => {
    dispatch(fetchPosts());
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
