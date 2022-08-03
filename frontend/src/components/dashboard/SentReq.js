// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.

import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchAPI12(props) {
  const [data, setData] = useState([]);
  const [names, setNames] = useState([]);

  const userid = localStorage.getItem("userKey");

  const apiGet = async () => {
    await axios
      .get("/dashboard/requestSent/" + userid)
      .then((res) => {
        setData(res.data.result);
        setNames(res.data.userlist);
        console.log(res.data.userlist);
        console.log(res.data.result);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    apiGet();
  }, []);

  return (
    <div className="items">
      {data.map((item) => (
        <div key={item.reqid} className="item">
          <h4 className="item-1">{item.title} </h4>
          <p className="item-4">{item.eventdate}</p>
          <p className="item-3">{"$" + item.amount}</p>
          <p className="item-6">
            {item.paiduser == null
              ? "0 paid"
              : item.paiduser.split(", ").length + " paid"}
          </p>
          <p className="item-2">
            {item.unpaiduser == null
              ? "0 unpaid"
              : item.unpaiduser.split(", ").length + " unpaid"}
          </p>
          <button
            className="item-5"
            onClick={() => {
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

              item.paiduser && item.unpaiduser
                ? props.passPaidUnPaid(
                    item.paiduser.split(", "),
                    item.unpaiduser.split(", ")
                  )
                : item.paiduser
                ? props.passPaidUnPaid(item.paiduser.split(", "), null)
                : item.unpaiduser
                ? props.passPaidUnPaid(null, item.unpaiduser.split(", "))
                : props.passPaidUnPaid(null, null);
            }}
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
}

export default FetchAPI12;
