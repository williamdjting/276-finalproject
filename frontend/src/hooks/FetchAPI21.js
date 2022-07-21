// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.


import React, { useEffect, useState } from 'react'
import "../stylesheets/fetchAPIcomponents/FetchAPI21.css"

function FetchAPI21() {

  const [data, setData] = useState([]);

  const apiGet = () => {
    fetch('/api/users/33')
    .then(response => response.json())
    .then( (json) => {
      console.log(json);
      setData(json);
      });
  };

    useEffect(() => {
      apiGet();
    }, []);

    return (
      <div>
        {/* <button onClick={apiGet}>FetchAPI</button>
        <br/> */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        <table>
          <tr>
          <td className="samerowintable21">
            Transaction Date
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            
            <td className="samerowintable21">
            Transaction User
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable21">
            Transaction Amount
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable21">
            Transaction Paid?
            </td>

          </tr>

          {/* above is the header */}
          <tr>
            <td className="samerowintable21">
            {data.map((item) => (
              <ul>{item.date.substring(0,16)} </ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable21">
            {data.map((item) => (
              <ul>{item.receiverid}</ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable21">
            {data.map((item) => (
              <ul>{item.amount}</ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable21">
            {data.map((item) => (
              <ul>{item.paid.toString()}</ul>
            ))}
            </td>
          </tr>
        </table>


      </div>
    );
}


export default FetchAPI21;




