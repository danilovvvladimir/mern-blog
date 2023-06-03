// ==> Libs imports <===
import { FC, ReactNode } from "react";
// ==> Components imports <===

// ==> Other imports <===
import "./Button.scss";

interface ButtonProps {
  children: ReactNode;
  extraClassName?: string;
}

const Button: FC<ButtonProps> = ({ children, extraClassName }) => {
  return (
    <button className={`button ${extraClassName ? extraClassName : ""}`}>
      {children}
    </button>
  );
};

export default Button;
