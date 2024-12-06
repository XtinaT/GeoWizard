import React, { ReactNode } from "react";

import "./global.css";

export const RootLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient">{children}</div>
);
