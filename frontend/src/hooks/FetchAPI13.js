// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.


import React, { useEffect, useState } from 'react'
import "../stylesheets/fetchAPIcomponents/FetchAPI13.css"

function FetchAPI13() {

  const [data, setData] = useState([]);

  var dynamicId2 = localStorage.getItem('userKey');

  let apiPath = '/api/users/'.concat(dynamicId2)
  console.log("this is apiPath", apiPath);

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

    var onlyMoneyRequestReceived = data.filter(function (el) {
      return el.paid == false && el.req_sent == false;
    })


    return (
      <div>
        {/* <button onClick={apiGet}>FetchAPI</button>
        <br/> */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        <table>
          <tr>
            <td className="samerowintable13">
            {onlyMoneyRequestReceived.map((item) => (
              <ul>{item.reqid} </ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable13">
            {onlyMoneyRequestReceived.map((item) => (
              <ul>{item.date.substring(0,16)}</ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable13">
            {onlyMoneyRequestReceived.map((item) => (
              <ul>{item.receiverid}</ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable12">
            {onlyMoneyRequestReceived.map((item) => (
              <ul>{item.amount}</ul>
            ))}
            </td>
            &nbsp;
            &nbsp;
            &nbsp;
            <td className="samerowintable12">
            {onlyMoneyRequestReceived.map((item) => (
              <ul>{item.paid.toString()}</ul>
            ))}
            </td>
          </tr>
        </table>


      </div>
    );
}


export default FetchAPI13;




