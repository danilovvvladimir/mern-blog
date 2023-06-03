// ==> Libs imports <===
import React, { FC } from "react";
// ==> Components imports <===

// ==> Other imports <===
import "./ErrorMessage.scss";

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
  return <div className="error-message">{children}</div>;
};

export default ErrorMessage;
