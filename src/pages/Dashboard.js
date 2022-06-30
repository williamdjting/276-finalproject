import React, { useState, useEffect } from 'react';
import "../stylesheets/dashboard.css";
// import DummyForm from '../components/dashboard/DummyForm'; //dummyForm.js is not used anymore
import Component11 from '../components/dashboard/component11';
import Component12 from '../components/dashboard/component12';
import Component13 from '../components/dashboard/component13';
import Component21 from '../components/dashboard/component21';
import Component22 from '../components/dashboard/component22';
import Component31 from '../components/dashboard/component31';

const Dashboard = () => {

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
        <div>
            <div> <h1>Dashboard</h1>
            </div>
        
            
            
            <table>
                <tr>
                    <td className="placeholder1" id="placeholder11">
                        
                        <Component11 names={name}/>
                        
                    </td>
                    <td className="placeholder1" id="placeholder12">
                        
                        <Component12 names={name}/>
                        
                    </td>
                    <td className="placeholder1" id="placeholder13">
                        <td>
                        <Component13 names={name}/>
                        </td>
                    </td>
                </tr>
                <tr className='column'>
        
                    <td className="placeholder2 " id="placeholder21">
                        
                        <Component21 names={name}/>
                        
                    </td>
                    <td className="placeholder2 " id="placeholder22">
                        
                        <Component22 names={name}/>
                        
                    </td>
                </tr>
                <tr>
                    <td className="placeholder3" id="placeholder31">
                        [Empty placeholder box]
                        
                    </td>
                    <td className="placeholder3" id="dummyform">
                        {/* <DummyForm/> */}
                        <form id="dummysubmitform" onSubmit = {formSubmitHandler}>
                            <input type="text" value={userData1} onChange={e=> setUserData1(e.target.value)}/>
                            <input type="text" value={userData2} onChange={e=> setUserData2(e.target.value)}/>
                            <input type="submit" text="Submit" intent="primary"/>
    </form>

                    </td>
                </tr>
            </table>
        
        </div>
        
    );
};
export default Dashboard;