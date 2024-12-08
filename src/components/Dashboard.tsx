import React from "react";

import Header from "./Header";
import StepForm from "./StepForm";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center gap-12">
      <Header />
      <StepForm />
    </div>
  );
};

export default Dashboard;
