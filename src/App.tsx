import React, { useState } from "react";

import Dashboard from "./components/Dashboard";
import MapViewer from "./components/MapViewer";
import { Screen } from "./constants";
import { RootLayout } from "./RootLayout";

export function App() {
  const [screen, setScreen] = useState(Screen.DASHBOARD);
  const [geoJsonData, setGeoJsonData] = useState<string>("");

  const handleNext = (data: string) => {
    setGeoJsonData(data);
    setScreen(Screen.MAP);
  };

  const handleStartNew = () => setScreen(Screen.DASHBOARD);

  return (
    <RootLayout>
      {screen === Screen.DASHBOARD && <Dashboard onNext={handleNext} />}
      {screen === Screen.MAP && <MapViewer geoJsonData={geoJsonData} onStartNew={handleStartNew} />}
    </RootLayout>
  );
}

export default App;
