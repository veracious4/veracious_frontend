import React from "react";
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import FactValidator from "../components/FactValidator/FactValidator";
import Header from "../components/Header/Header";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header /> 
      <Routes>
        {/* Replace Route with public and private  */}
        <Route path="/fact-validator" element={<FactValidator />} />
        <Route path="/signup" element={<FactValidator />} />
        <Route path="/code-generator" element={<FactValidator />} />
        <Route path="/instructions" element={<FactValidator />} />
        <Route path="/" element={<FactValidator/>}/>
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;