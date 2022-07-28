import React, { useState, useEffect } from "react";
import "../stylesheets/dashboard/dashboard.css";
import "../stylesheets/dashboard/fetch.css";
import "../stylesheets/dashboard/component.css";

// import DummyForm from '../components/dashboard/DummyForm'; //dummyForm.js is not used anymore
import Component11 from "../components/dashboard/component11";
import Component12 from "../components/dashboard/SentReq";
import Component13 from "../components/dashboard/ReceivedReq";
import Component21 from "../components/dashboard/component21";
import Component22 from "../components/dashboard/component22";
// import Component31 from '../components/dashboard/component31';

const Dashboard = () => {
  const [state, setState] = useState(true);
  const [hover, setHover] = useState(false);

  return (
    <div className="dashboard">
      <Component11 />
      <div className="request-container placeholder">
        <h3>Requests</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "25px",
          }}
          className="request-buttons"
        >
          <button
          onMouseEnter={()=>{setHover(true)}}
          onMouseLeave={()=>{setHover(false)}}
            style={
              (state && !hover)
                ? ({ backgroundPosition: "right", color: "white" })
                : undefined
            }
            className="option1"
            onClick={() => {
              setState(true);
            }}
          >
            Received
          </button>
          <button
          onMouseEnter={()=>{setHover(true)}}
          onMouseLeave={()=>{setHover(false)}}
            style={
              (!state && !hover)
                ? { backgroundPosition: "left", color: "white" }
                : undefined
            }
            className="option2"
            onClick={() => {
              setState(false);
            }}
          >
            Sent Out
          </button>
        </div>
        {state ? <Component13 /> : <Component12 />}
      </div>
      <Component21 />
    </div>
  );
};
export default Dashboard;
