import React, { useState, useEffect } from "react";
import "../../pages/Dashboard";
import axios from "axios"

function Component21(props) {
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
    <div className="placeholder history-container">
      <h3>Transaction History</h3>
      <div className="history-table">
        <table>
          {data.map((item) => (
            <tr key={item.reqid}>
              <td>{item.date.substring(0, 10)} </td>
              <td>{item.title} </td>
              <td>
                {item.req_sent
                  ? "to " + item.receiverid.split(", ").length + " users"
                  : "from " + item.receiverid}
              </td>
              <td>{"$" + item.amount}</td>
              <a href=""  onClick={(e) => {
                e.preventDefault();
              props.passData(
                true,
                "Invoice",
                item.title,
                item.date,
                item.eventdate,
                item.amount,
                names,
                item.reqid
              );
              
              props.passPaidUnPaid(
                    item.receiverid.split(", "),
                    null
                  )

            }}> view more </a>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Component21;
