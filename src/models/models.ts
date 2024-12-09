import { ChangeEvent } from "react";

import { TextInput } from "../constants";

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export type CustomInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  label?: React.ReactNode;
  onClear?: () => void;
  showError?: boolean;
  type: TextInput;
} & (InputProps | TextAreaProps);

export type Data = {
  file: File | undefined;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
};
