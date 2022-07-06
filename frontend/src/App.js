import "./App.css";
import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import NewForm from "./pages/NewForm";
import Admin from "./pages/Admin";

import WithoutNav from "./pages/WithoutNav";
import WithNav from "./pages/WithNav";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  // function RequireAuth({ children }) {
  //   const authed = localStorage.getItem("isAuthed");
  //   console.log("authed: " + authed);
  //   return authed ? children : <Navigate to="/login" replace />;
  // }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route
            element={
              // <RequireAuth>
                <WithNav />
              // </RequireAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
<<<<<<< HEAD
            <Route path="/dashboard" element={<Dashboard />} />
=======
>>>>>>> 0b44eaac66f6190c4f2dde04cec8011be51f22e7
            <Route path="/newForm" element={<NewForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
