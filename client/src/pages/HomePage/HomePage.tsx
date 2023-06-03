// ==> Libs imports <===
import { FC } from "react";
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
          <div className="home__aside">
            <ul>
              <li>
                <h4 className="title">hello</h4>
              </li>
              <li>
                <h4 className="title">hello</h4>
              </li>
              <li>
                <h4 className="title">hello</h4>
              </li>
              <li>
                <h4 className="title">hello</h4>
              </li>
              <li>
                <h4 className="title">hello</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
