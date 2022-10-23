import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import HomePage from "./components/HomePage/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
