import React, { useState, useEffect } from "react";
import "../stylesheets/dashboard/dashboard.css";
import "../stylesheets/dashboard/fetch.css";
import "../stylesheets/dashboard/component.css";

// import DummyForm from '../components/dashboard/DummyForm'; //dummyForm.js is not used anymore
import Component11 from "../components/dashboard/component11";
import Component12 from "../components/dashboard/SentReq";
import Component13 from "../components/dashboard/ReceivedReq";
import Component21 from "../components/dashboard/component21";

//stripe Check Out
import CheckoutForm from "../components/dashboard/CheckOut";
import PopUpForm from "../components/admin/PopUpForm";
// import Component31 from '../components/dashboard/component31';

const Dashboard = () => {
  const [state, setState] = useState(true);
  const [hover, setHover] = useState(false);
  const [visibility, setVisibility] = useState(false);

  //close pop up window
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  //communicate Pop Up with child elements
  const passData = (visibility) => {
    setVisibility(visibility);
  };

  return (
    <div className="dashboard">
      <PopUpForm
        onClose={popupCloseHandler}
        show={visibility}
        title={"Payment"}
      >
        <CheckoutForm />
      </PopUpForm>

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
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            style={
              state && !hover
                ? { backgroundPosition: "right", color: "white" }
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
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            style={
              !state && !hover
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

        {state ? <Component13 passData = {passData}/> : <Component12 />}
      </div>
      <Component21 />
    </div>
  );
};
export default Dashboard;
