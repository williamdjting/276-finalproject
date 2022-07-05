// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.


import React, { useEffect, useState } from 'react'
import "../stylesheets/fetchAPIcomponents/FetchAPI11.css"

function FetchAPI11() {

  const [data, setData] = useState([]);

  const apiGet = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
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
            {/* <td className="samerowintable11">
            {data.map((item) => (
              <ul>{item.userId} </ul>
            ))}
            </td> */}
            <td className="samerowintable11">
            {data.map((item) => (
              <ul>{item.title.substring(0,20)}</ul>
            ))}
            </td>
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




