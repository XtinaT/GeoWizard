import React, { ReactNode } from "react";

import { error } from "../assets/icons/icons";

type ErrorPropsType = {
  message: ReactNode;
};

const ErrorField = ({ message }: ErrorPropsType) => {
  return (
    <div className="flex gap-2 p-2 rounded-full items-start bg-error bg-opacity-25">
      {error}
      <div className="flex flex-col">
        <span className="text-12 text-error">{message}</span>
      </div>
    </div>
  );
};

export default ErrorField;
