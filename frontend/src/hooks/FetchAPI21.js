// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.

import React, { useEffect, useState } from "react";

function FetchAPI21() {
  const [data, setData] = useState([]);

  var dynamicId2 = localStorage.getItem("userKey");
  console.log("this is dynamicId2", dynamicId2);
  let apiPath = "/api/users/".concat(dynamicId2);

  const apiGet = () => {
    fetch(apiPath)
      // fetch('/api/users/33')
      .then((response) => response.json())
      .then((json) => {
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
          <th>Date</th>
          <th>Time</th>
          <th>User</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>

        {/* above is the header */}

        {data.map((item) => (
          <tr>
            <td>{item.date.substring(0, 10)} </td>
            <td>{item.date.substring(11, 16)} </td>
            <td>{item.receiverid}</td>
            <td  >{item.amount}</td>
            <td>{item.paid.toString() == "true" ? "paid" : "unpaid"}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default FetchAPI21;
