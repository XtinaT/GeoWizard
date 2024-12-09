import React, { ReactNode } from "react";

import { closeIcon } from "../assets/icons/icons";
import { ModalType } from "../constants";

interface IModalProps {
  children: ReactNode;
  type?: ModalType;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, type, isOpen, onClose }: IModalProps) => {
  return (
    <div
      className={`blured flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full transition-opacity duration-200 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex flex-col gap-4 items-center w-full relative z-30 ">
        <div
          onClick={onClose}
          className="flex justify-center items-center rounded-full w-9 h-9 p-1 bg-black bg-opacity-40 cursor-pointer hover:scale-105 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            {closeIcon}
          </svg>
        </div>
        <div
          className={`flex flex-col gap-6 relative h-full p-6 items-center rounded-[20px] w-[90vw] sm:w-[422px] modalWrapper transform transition-transform duration-200 ${
            isOpen ? "scale-100" : "scale-90"
          } ${type === ModalType.FAIL ? "bg-error" : "bg-black"} `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
