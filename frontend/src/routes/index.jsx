import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import VerifyEmail from "../pages/verifyEmail/VerifyEmail";
import Dashboard from "../pages/Dashboard/Dashboard";

function RouterApp() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
      <Route path="/verify/:token" element={<VerifyEmail />} />
      <Route
        path="*"
        element={<div className="text-center">PAGE NOT FOUND 404!</div>}
      />
    </Routes>
  );
}

export default RouterApp;
