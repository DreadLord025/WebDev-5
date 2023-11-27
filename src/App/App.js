// App.js
import "../css/App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider } from "../AppContext";
import Header from "../Home/Header";
import BodyComponent from "../Home/BodyComponent";
import Debug from "./Debug";
import About from "../About/About";
import Contacts from "../Contancts/Contacts";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppWithRouter />
      </Router>
    </AppProvider>
  );
};

const AppWithRouter = () => {
  const location = useLocation();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, location.pathname]);
  }, [location]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BodyComponent />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contacts/>} />
        <Route path="/debug" element={<Debug history={history} />} />
      </Routes>
    </div>
  );
};

export default App;
