import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const RequestForm = (props) => {
  const location = useLocation();

  const [userid, setUserid] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);

  const getData = async () => {
    console.log(location.state.userid);
    await axios
      .get("/api/users/" + location.state.userid)
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>{"User-ID "+ location.state.userid}</h1>
      <table className="adminRequest">
        <tr>
          <th>Req ID</th>
          <th>Req Sent</th>
          <th>Title</th>
          <th>Event Date</th>
          <th>Date</th>
          <th>Receiver ID</th>
          <th>Paid</th>
          <th colSpan={3}>Operation</th>
        </tr>
        {data.map((item) => (
          <tr key={item.reqid + Math.random() * 99}>
            <td>{item.reqid}</td>
            <td>{item.req_sent ? "true" : "false"}</td>
            <td>{item.title}</td>
            <td>{item.eventdate}</td>
            <td>{item.date}</td>
            <td>{item.receiverid}</td>
            <td>{item.paid ? "true" : "false"}</td>
            <td>
              <button onClick={() => {setEdit(!edit)}}>Edit</button>
            </td>
            <td>
              <button>Save</button>
            </td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default RequestForm;
