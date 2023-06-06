// ==> Libs imports <===
import { FC } from "react";
// ==> Components imports <===

// ==> Other imports <===
import loaderSVG from "../../../assets/images/loader.svg";
import "./Spinner.scss";

const Spinner: FC = () => {
  return (
    <div className="loader">
      <img src={loaderSVG} alt="loader" className="loader__image" />
    </div>
  );
};

export default Spinner;
