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
  useEffect(() => {
    let emptyVal = localStorage.getItem("texts");
    let subVal;
    if (emptyVal === null) {
      subVal = [];
    } else {
      subVal = JSON.parse(localStorage.getItem("texts"));
    }
    setName(subVal);
  }, []);

  const [name, setName] = useState([]);
  const [userData1, setUserData1] = useState("");
  const [userData2, setUserData2] = useState("");
  const [userData3, setUserData3] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setName([...name, userData1]);
    let updatedSetName = [...name, userData1];
    // every setName state change updates the updatedSetName variable with a bigger string array that is then hit with setItem
    localStorage.setItem("texts", JSON.stringify(updatedSetName));
  };

  return (
    <div className="dashboard">
      <Component11 names={name} />
      <Component12 names={name} />
      <Component13 names={name} />
      <Component21 names={name} />
    </div>
  );
};
export default Dashboard;
