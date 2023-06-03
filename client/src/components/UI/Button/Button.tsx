// ==> Libs imports <===
import { FC, ReactNode } from "react";
// ==> Components imports <===

// ==> Other imports <===
import "./Button.scss";

interface ButtonProps {
  children: ReactNode;
  extraClassName?: string;
  isSubmit?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, extraClassName, isSubmit, onClick }) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className={`button ${extraClassName ? extraClassName : ""}`}>
      {children}
    </button>
  );
};

export default Button;
