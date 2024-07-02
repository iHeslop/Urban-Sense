import HomePage from "./pages/HomePage/HomePage";
import TrafficPage from "./pages/TrafficPage/TrafficPage";
import PollutionPage from "./pages/PollutionPage/PollutionPage";
import WaterPage from "./pages/WaterPage/WaterPage";
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
          <Route path="/pollution" element={<PollutionPage />} />
          <Route path="/water" element={<WaterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
