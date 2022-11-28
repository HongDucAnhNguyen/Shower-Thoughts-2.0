import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Details from "./components/DetailsPage/Details";
import HomePage from "./components/HomePage/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import Navbar from "./components/NavBar/Navbar";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <br />
        <Routes>
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/details/:id" exact element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
