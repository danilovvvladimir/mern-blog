// ==> Libs imports <===
import { FC, ReactNode } from "react";
// ==> Components imports <===

// ==> Other imports <===
import "./Button.scss";

interface ButtonProps {
  children: ReactNode;
  extraClassName?: string;
  isSubmit?: boolean;
}

const Button: FC<ButtonProps> = ({ children, extraClassName, isSubmit }) => {
  return (
    <button type={isSubmit ? "submit" : "button"} className={`button ${extraClassName ? extraClassName : ""}`}>
      {children}
    </button>
  );
};

export default Button;
