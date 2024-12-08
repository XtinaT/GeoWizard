import React, { useState } from "react";

import Dashboard from "./components/Dashboard";
import { Screen } from "./constants";
import { RootLayout } from "./RootLayout";

export function App() {
  const [screen, setScreen] = useState(Screen.DASHBOARD);
  return (
    <RootLayout>
      {screen === Screen.DASHBOARD && <Dashboard />}
      {screen === Screen.MAP && <div>I am Map</div>}
    </RootLayout>
  );
}

export default App;
