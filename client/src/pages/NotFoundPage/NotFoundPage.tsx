// ==> Libs imports <===
import { FC } from "react";
// ==> Components imports <===

// ==> Other imports <===
import notfoundIMG from "../../assets/images/notfound.svg";
import Button from "../../components/UI/Button/Button";
import "./NotFoundPage.scss";

const NotFoundPage: FC = () => {
  return (
    <section className="notfound">
      <div className="container">
        <div className="notfound__wrapper">
          <div className="notfound__text">
            <h1 className="title notfound__title">
              Error 404. <br />
              Page not found :(
            </h1>
            <p className="subtitle notfound__subtitle">
              Sorry, page you are looking for is not found. You might possibly write wrong URL...
            </p>
            <Button extraClassName="notfound__button">Go back</Button>
          </div>
          <img src={notfoundIMG} alt="notfound page" className="notfound__image" />
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
