import React, { ReactNode } from "react";

type StepWrapperPropsType = {
  children: ReactNode;
};
const StepWrapper = ({ children }: StepWrapperPropsType) => {
  return (
    <div className="w-[544px] min-h-[255px] flex flex-col justify-center gap-5 rounded-xl p-6 grow  bg-black bg-opacity-20">
      {children}
    </div>
  );
};

export default StepWrapper;
