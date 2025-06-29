import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "./Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Login from "./pages/Login";
import axios from "axios";
import { MoonLoader } from "react-spinners";

import { useDispatch } from "react-redux";
import useFetchCurrentUser from "./hooks/Auth/useFetchCurrentUser";
import { useEffect } from "react";
import { setUser } from "./store/slices/user";
import { Suspense, lazy } from "react";

// Import all components directly
import Home from "./pages/Home";
import Slider from "./pages/Home/components/Slider";
import NewsSection from "./pages/Home/components/NewsSection";
import StatsSection from "./pages/Home/components/StatsSection";
import Projects from "./pages/Home/components/Projects";
import SeasonalProjectsSection from "./pages/Home/components/SeasonalProjects";
import StrategicPartners from "./pages/Home/components/StrategicPartners";
import CircularGallery from "../yes/CircularSlider";
import Footer from "./components/Footer";
import SignFamily from "./pages/SignFamily/testIndex";

// Lazy load Dashboard, AdminLogin, and BeneficiaryDetails
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const BeneficiaryDetails = lazy(() => import("./pages/BeneficiaryDetails"));

axios.defaults.withCredentials = true;   
config.autoAddCss = false;

function App() {
  const dispatch = useDispatch()
  const {isLoading, userData} = useFetchCurrentUser()
   console.log(import.meta.env.VITE_NODE_ENV)
  useEffect(() => {
      if (userData) {
        const token = JSON.parse(localStorage.getItem("user") || "")?.token;
        userData.token = token;
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      }
  }, [userData, dispatch]);

  if (isLoading) {
      return <div className="h-screen w-screen flex justify-center items-center">
        <MoonLoader color="#000" />
      </div>
  }
 
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public/General Layout */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
            <Route path='/sign-family' element={userData ? <SignFamily userData={userData} /> : <Navigate to="/login" />} />
          </Route>
          {/* Admin Layout: No Header, No Layout */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/beneficiary/:id" element={<BeneficiaryDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
