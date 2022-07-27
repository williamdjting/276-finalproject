import React, { useState, useEffect } from "react";
import "../stylesheets/dashboard/dashboard.css";
import "../stylesheets/dashboard/fetch.css";
import "../stylesheets/dashboard/component.css";

// import DummyForm from '../components/dashboard/DummyForm'; //dummyForm.js is not used anymore
import Component11 from "../components/dashboard/component11";
import Component12 from "../components/dashboard/component12";
import Component13 from "../components/dashboard/component13";
import Component21 from "../components/dashboard/component21";
import Component22 from "../components/dashboard/component22";
// import Component31 from '../components/dashboard/component31';

const Dashboard = () => {
  const [state, setState] = useState(true);

  return (
    <div className="dashboard">
      <Component11 />
      <div className="request-container placeholder">
        <h3>Requests</h3>
        <button className="option1" onClick={()=>{setState(true)}}>Received</button>
        <button className="option2" onClick={()=>{setState(false)}}>Sent</button>
        {state?(<Component13 />):(<Component12 />)}
      </div>
      <Component21 />
    </div>
  );
};
export default Dashboard;
