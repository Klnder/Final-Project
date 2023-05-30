import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import About from "./pages/About";
import ViewTrip from "./pages/ViewTrip";
import NoPage from "./pages/NoPage";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Rickrolled from "./pages/Rickrolled";
import Login from "./pages/Login";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

export default function App() {
  let theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1a237e",
        light: "#0a1fea",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#e1d4b7",
        paper: "#38342e",
      },
      text: {
        primary: "rgba(255,255,255,0.87)",
      },
    },
    typography: {
      fontSize: 16,
      h1: {
        fontSize: "2rem",
      },
    },
  });
  const { user, isAuthenticated } = useAuth0();
  const [trips, setTrips] = useState([]);
  const [widthScreen, setWidthScreen] = useState(10000);
  const [heightScreen, setHeightScreen] = useState(10000);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    setInterval(() => {
      getWindowDimensions();
    }, 2000);
  });
  useEffect(() => {
    if (isAuthenticated) getTrips(user);
  }, [isAuthenticated]);

  async function getTrips(user) {
    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trips/${user.nickname}`;
      const res = await axios.get(API);
      setTrips(res.data);
      setShowDashboard(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTrip(id) {
    try {
      const API = `${process.env.REACT_APP_API_ADDRESS}/trip/${id}`;
      await axios.delete(API);
      getTrips(user);
    } catch (error) {
      console.log(error);
    }
    toast.info("Trip deleted !");
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    setHeightScreen(height);
    setWidthScreen(width);
  }
  //window.addEventListener("resize", getWindowDimensions);

  if (!isAuthenticated) {
    if (widthScreen < 1100 || heightScreen < 750) {
      return <Rickrolled />;
    } else {
      return (
        <div className="login-container">
          <Login />
        </div>
      );
    }
  }

  if (isAuthenticated) {
    if (widthScreen < 1100 || heightScreen < 750) {
      return <Rickrolled />;
    } else {
      return (
        <div className="App">
          {!showDashboard && (
            <div className="animation-dashboard">
              <ReactLoading type="spin" color="blue" height={200} width={200} />
              <h2>Loading your dashboard</h2>
            </div>
          )}
          {showDashboard && (
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <Header user={user} trips={trips} />
                <main>
                  <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="colored"
                    limit={3}
                  />
                  <Routes>
                    <Route path="/" element="" />
                    <Route path="/home" element={<Home trips={trips} deleteTrip={deleteTrip} getTrips={getTrips} />} />
                    <Route path="/createtrip" element={<CreateTrip getTrips={getTrips} />} />
                    <Route path="/viewtrip/:tripid" element={<ViewTrip />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                  </Routes>
                </main>
                <Footer />
              </ThemeProvider>
            </BrowserRouter>
          )}
        </div>
      );
    }
  }
}
