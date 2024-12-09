import React from "react";

import ButtonSpinner from "./ButtonSpinner";

type CustomButtonPropsType = {
  text: string;
  onButtonClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};
const CustomButton = ({
  text,
  onButtonClick,
  disabled = false,
  isLoading = false,
  type = "submit",
}: CustomButtonPropsType) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onButtonClick}
      className="rounded-full py-4 px-3 bg-btn-bg bg-opacity-60 text-brand-green font-semibold grow opacity hover:bg-opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:hover:bg-opacity-60 disabled:cursor-not-allowed"
      aria-label={isLoading ? "Submitting..." : text}
    >
      {isLoading ? <ButtonSpinner /> : <>{text}</>}
    </button>
  );
};

export default CustomButton;
