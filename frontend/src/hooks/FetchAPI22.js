// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.


import React, { useEffect, useState } from 'react'

function FetchAPI22() {

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
            <td className="samerowintable">
            {data.map((item) => (
              <ul>{item.userid} </ul>
            ))}
            </td>

            <td className="samerowintable">
            {data.map((item) => (
              <ul>{item.nickname} </ul>
            ))}
            </td>
          </tr>
        </table>


      </div>
    );
}


export default FetchAPI22;




