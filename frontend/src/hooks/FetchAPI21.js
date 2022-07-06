// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.


import React, { useEffect, useState } from 'react'
import "../stylesheets/fetchAPIcomponents/FetchAPI21.css"

function FetchAPI21() {

  const [data, setData] = useState([]);

  const apiGet = () => {
    fetch('/api/users')
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
            {data.map((item) => (
              <ul>{item.userid} </ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable21">
            {data.map((item) => (
              <ul>{item.username}</ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable21">
            {data.map((item) => (
              <ul>{item.password.substring(0,20)}</ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable21">
            {data.map((item) => (
              <ul>{item.nickname}</ul>
            ))}
            </td>
          </tr>
        </table>


      </div>
    );
}


export default FetchAPI21;




