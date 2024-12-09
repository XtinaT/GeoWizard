import React, { ChangeEvent } from "react";

import ErrorField from "./ErrorField";
import { TextInput } from "../../constants";
import { CustomInputProps, InputProps, TextAreaProps } from "../../models/models";

const CustomTextInput = ({
  error,
  value,
  label,
  onChange,
  showError,
  disabled,
  type,
  ...inputProps
}: CustomInputProps) => {
  const classes = `
  block w-full px-[16px] py-[14px] text-16 border font-medium 
  ${type === TextInput.TEXTAREA ? "rounded-lg resize-none" : "rounded-full"} 
  caret-brand-green focus-visible:outline focus-visible:outline-brand-green focus-visible:bg-black focus-visible:bg-opacity-50 appearance-none
  text-white placeholder:text-brand-grey 
  ${error ? "border-error bg-black bg-opacity-30" : "bg-black bg-opacity-40 border-none"}
`;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/(\s{2,})/g, " ");
    e.target.value = inputValue;
    onChange && onChange(e);
  };

  return (
    <div className={`${disabled ? "opacity-25 cursor-not-allowed" : "opacity100"}`}>
      {label && <label className={`text-14 text-white break-words font-medium block mb-3`}>{label}</label>}
      <div className="relative flex items-center">
        {type === TextInput.TEXT ? (
          <input
            {...(inputProps as InputProps)}
            value={value}
            onChange={handleOnChange}
            disabled={disabled}
            className={classes}
            autoComplete={"new-password"}
          />
        ) : (
          <textarea
            rows={6}
            {...(inputProps as TextAreaProps)}
            value={value}
            onChange={handleOnChange}
            disabled={disabled}
            className={classes}
          />
        )}
      </div>
      {error && showError && (
        <div className="mt-3">
          <ErrorField message={error} />
        </div>
      )}
    </div>
  );
};

export default CustomTextInput;
