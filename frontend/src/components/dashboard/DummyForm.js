import React, { useState, useEffect } from 'react';




// I've deprecated this js file. I moved the contents of this into Dashboard.js because I needed to have Dashboard as parent so the other components11/12/13/21/22 could get props received from Dashboard.Js

// Otherwise it would have been like 
// DummyForm > Dashboard > Child Components, makes props drilling difficult. If we switch over to useContext then maybe we can simplify.


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
    <Component11 names={name}/>
    </>
   );
}

export default DummyForm;