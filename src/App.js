
import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewForm from "./pages/NewForm";
import WithoutNav from "./pages/WithoutNav";
import WithNav from "./pages/WithNav";

function App() {

    return (
        <BrowserRouter>
        <Routes>

          <Route element={<WithoutNav />}>
              <Route path="/login" element={<Login />} />
            </Route>

          <Route element={<WithNav />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/newForm" element={<NewForm />} />
            </Route>

            </Routes>
        </BrowserRouter>

           
  );
}

export default App;
