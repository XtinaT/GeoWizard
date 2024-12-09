import React from "react";

import StepForm from "./form/StepForm";
import Header from "./Header";

const Dashboard = ({ onNext }: { onNext: (data: string) => void }) => {
  return (
    <div className="flex flex-col items-center gap-12">
      <Header />
      <StepForm onNext={onNext} />
    </div>
  );
};

export default Dashboard;
