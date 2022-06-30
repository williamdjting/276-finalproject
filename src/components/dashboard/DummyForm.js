import React, { useState, useEffect } from 'react';
import "../../stylesheets/dashboardcomponents/dummyform.css";

function DummyForm() {

  useEffect( () => {
    
    let emptyVal = localStorage.getItem("texts");
    let subVal;
    if (emptyVal === null) {
      subVal = [];
    }
    else {
      subVal = JSON.parse(localStorage.getItem("texts"));
    
    }
    setName(subVal);
  },[]);

  const [name, setName] = useState([]);
  const [userData1, setUserData1] = useState("");
  const [userData2, setUserData2] = useState("");

  const formSubmitHandler = e => {
    e.preventDefault();

    setName([...name,userData1]);
    let updatedSetName = [...name,userData1];
    // every setName state change updates the updatedSetName variable with a bigger string array that is then hit with setItem
    localStorage.setItem("texts", JSON.stringify(updatedSetName) );

  }

  return ( 
    <>
    <form id="dummysubmitform" onSubmit = {formSubmitHandler}>
      <input type="text" value={userData1} onChange={e=> setUserData1(e.target.value)}/>
      <input type="text" value={userData2} onChange={e=> setUserData2(e.target.value)}/>
      
      <input type="submit" text="Submit" intent="primary"/>


    </form>
    {/* add child components here */}
    
    </>
   );
}

export default DummyForm;