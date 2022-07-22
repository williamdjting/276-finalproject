// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.


import React, { useEffect, useState } from 'react'
import "../stylesheets/fetchAPIcomponents/FetchAPI11.css"

function FetchAPI11() {

  const [data, setData] = useState([]);
  // const [newdata, setNewdata] = useState([]);

  var dynamicId2 = localStorage.getItem('userKey');
  console.log("this is dynamicId2", dynamicId2);
  let apiPath = '/api/users/'.concat(dynamicId2)

  const apiGet = () => {
    fetch(apiPath)
    // fetch('/api/users/33')
    .then(response => response.json())
    .then( (json) => {
      console.log(json);
      setData(json);
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

//onlyUnpaidCharges this is an object array that only has paid: false
  var onlyUnpaidCharges = data.filter(function (el) {
    return el.paid == false;
  })

  // console.log("object array of onlyUnpaidCharges",onlyUnpaidCharges)

  var sumOfTotal = onlyUnpaidCharges.reduce((total, obj) => obj.amount + total, 0);
  // outputs the total unpaid charges 

  // console.log("this is the sumOfTotal",sumOfTotal);


  return (
      <div>
        {/* <button onClick={apiGet}>FetchAPI</button>
        <br/> */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        <table>
          <tr>
            ${sumOfTotal}
            {/* <td className="samerowintable11">
            {data.map((item) => (
              <ul>{item.userId} </ul>
            ))}
            </td> */}
            {/* <td className="samerowintable11">
            {onlyUnpaidCharges.map((item) => (
              <ul>{item.reqid}</ul>
            ))}
            </td> */}
            {/* <td className="samerowintable11">
            {data.map((item) => (
              <ul>{item.completed}</ul>
            ))}
            </td> */}
          </tr>
        </table>


      </div>
    );
}


export default FetchAPI11;




