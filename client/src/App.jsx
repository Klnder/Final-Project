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
import Prank from "./pages/Prank";

function App() {
  const { loginWithRedirect, loginWithPopup, loading, user, isAuthenticated } = useAuth0();
  const [trips, setTrips] = useState([]);
  const [widthScreen, setWidthScreen] = useState("");
  const [heightScreen, setHeightScreen] = useState("");

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      loginWithPopup();
    }
  }, []);
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
    console.log(width);
    console.log(height);
    setHeightScreen(height);
    setWidthScreen(width);
    return {
      width,
      height,
    };
  }
  window.addEventListener("resize", getWindowDimensions);
  // if (!isAuthenticated) {
  //   return (
  //     <div className="App">
  //       <button onClick={() => loginWithRedirect()}> Login </button>
  //     </div>
  //   );
  // }

  if (isAuthenticated && widthScreen < 750) {
    return <Prank />;
  }
  if (isAuthenticated && widthScreen > 750) {
    getTrips();
    return (
      <div className="App">
        <BrowserRouter>
          <Header user={user} trips={trips} />
          <main>
            <Routes>
              <Route path="/" element={<Home trips={trips} deleteTrip={deleteTrip} />} />
              <Route path="/createtrip" element={<CreateTrip user={user} />} />
              <Route path="/modifytrip" element={<ModifyTrip />} />
              <Route path="/viewtrip/:tripid" element={<ViewTrip trips={trips} />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
