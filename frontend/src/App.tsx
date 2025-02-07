import HomePage from "./pages/HomePage/HomePage";
import TrafficPage from "./pages/TrafficPage/TrafficPage";
import AirPage from "./pages/AirPage/AirPage";
import WaterPage from "./pages/WaterPage/WaterPage";
import EnergyPage from "./pages/EnergyPage/EnergyPage";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/pollution" element={<AirPage />} />
          <Route path="/water" element={<WaterPage />} />
          <Route path="/energy" element={<EnergyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
