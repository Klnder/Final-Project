import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import About from "./pages/About";
import ModifyTrip from "./pages/ModifyTrip";
import ViewTrip from "./pages/ViewTrip";
import NoPage from "./pages/NoPage";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Rickrolled from "./pages/Rickrolled";
import Login from "./pages/Login";
import ReactLoading from "react-loading";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [trips, setTrips] = useState([]);
  const [widthScreen, setWidthScreen] = useState("");
  const [heightScreen, setHeightScreen] = useState("");

  useEffect(() => {
    getWindowDimensions();
  }, []);

  async function getTrips() {
    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trips/${user.nickname}`;
      const res = await axios.get(API);
      setTrips(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTrip(id) {
    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trip/${id}`;
      await axios.delete(API);
      getTrips();
    } catch (error) {
      console.log(error);
    }
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    setHeightScreen(height);
    setWidthScreen(width);
  }
  window.addEventListener("resize", getWindowDimensions);

  if (widthScreen < 1000 || heightScreen < 750) {
    return <Rickrolled />;
  }

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <Login />
      </div>
    );
  }

  if (isAuthenticated) {
    getTrips();
    return (
      <div className="App">
        {trips.length === 0 && (
          <div className="animation-dashboard">
            <ReactLoading type="spin" color="blue" height={200} width={200} />
            <h2>Loading your dashboard</h2>
          </div>
        )}
        {trips.length !== 0 && (
          <BrowserRouter>
            <Header user={user} trips={trips} />
            <main>
              <Routes>
                <Route path="/" element="" />
                <Route path="/home" element={<Home trips={trips} deleteTrip={deleteTrip} />} />
                <Route path="/createtrip" element={<CreateTrip user={user} />} />
                <Route path="/modifytrip" element={<ModifyTrip />} />
                <Route path="/viewtrip/:tripid" element={<ViewTrip />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
