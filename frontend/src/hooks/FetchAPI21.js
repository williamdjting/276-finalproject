// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.

import React, { useEffect, useState } from "react";
import axios from 'axios';

function FetchAPI21() {
  const [data, setData] = useState([]);
  const [names, setNames] = useState({});

  var userid = localStorage.getItem("userKey");

  const apiGet = async () => {
    await axios
      .get("/dashboard/history/" + userid)
      .then((res) => {
        setData(res.data.result);
        setNames(res.data.userlist);
      })
      .catch((err) => console.log(err));
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

        {/* above is the header */}

        {data.map((item) => (
          <tr key={item.reqid}>
            <td>{item.date.substring(0, 10)} </td>
            <td>{item.title} </td>
            <td>{item.req_sent ? ("to " + item.receiverid.split(", ").length):("from " + item.receiverid)}</td>
            <td >{"$"+item.amount}</td>
            <a href=""> view more </a>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default FetchAPI21;
