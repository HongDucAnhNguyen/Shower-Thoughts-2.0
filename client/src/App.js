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
          <Route path="/details" exact element={<Details />} />
          <Route
            path="/about"
            exact
            element={<div>This is the about page</div>}
          />
          <Route
            path="/*"
            element={<div>This is the 404 page, content not found</div>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
