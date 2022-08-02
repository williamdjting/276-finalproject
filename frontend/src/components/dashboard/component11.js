import React, { useState, useEffect } from "react";
import "../../pages/Dashboard";
import axios from "axios";

const Component11 = (props) => {
  const [sent, setSent] = useState(0);
  const [receive, setReceive] = useState(0);
  const username = localStorage.getItem("username");
  const userid = localStorage.getItem("userKey");

  const apiGet = () => {
    axios
      .get("./dashboard/getInfo/" + userid)
      .then((res) => {
        setSent(res.data.sent);
        setReceive(res.data.receive);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

  return (
    <div className="info-container">
      <div className="userinfo">
        <div className="username placeholder ">
          <h2>Welcome</h2>
          <h2 style={{textAlign:"center", width:"100%", marginTop:"25px"}}>{username}</h2>
        </div>

        <div className="placeholder receive">
          <p>Pending Received</p>
          <h3>{"$" + receive}</h3>
        </div>

        <div className="sent placeholder ">
          <p>Pending Sent</p>
          <h3>{"$" + sent}</h3>
        </div>
      </div>
    </div>
  );
};

export default Component11;
