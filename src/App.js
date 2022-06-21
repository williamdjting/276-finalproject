
import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewForm from "./components/NewForm";
import WithoutNav from "./components/WithoutNav";
import WithNav from "./components/WithNav";

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
