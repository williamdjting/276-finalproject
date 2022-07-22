import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

//main pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";

//sub pages
import NewForm from "./pages/NewForm";
import Profile from "./pages/Profile";

//page styles
import WithoutNav from "./pages/WithoutNav";
import WithNav from "./pages/WithNav";

//customized hook
import { AuthProvider } from "./hooks/useAuth";

function App() {
  function RequireAuth({ children }) {
    const authed = localStorage.getItem("isAuthed");
    console.log("authed: " + authed);
    return authed ? children : <Navigate to="/login" replace />;
  }

  function SwitchElements() {
    const role = localStorage.getItem("role");
    console.log("role: " + role);
    if (role == "admin") return <Admin />;
    else if (role == "regular") return <Dashboard />;
    else return <Dashboard />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route
            element={
              <RequireAuth>
                <WithNav />
              </RequireAuth>
            }
          >
            <Route path="/" element={<SwitchElements />} />
            <Route path="/newForm" element={<NewForm />} />
            <Route path="/editprofile" element={<Profile />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
