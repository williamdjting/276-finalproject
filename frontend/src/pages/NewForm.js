import React, { useState, useEffect } from "react";
import "../stylesheets/newform.css";
import deleteIcon from "../icons/close.svg";
import PeopleForm from "../components/newForm/PeopleForm";
import axios from "axios";

const NewForm = () => {
  const [type, setType] = useState("text");
  const [userListData, setUserListData] = useState([]);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [eventdate, setEventDate] = useState("");

  const passData = (data) => {
    setUserListData(data);
    console.log("parent: " + data);
  };

  useEffect(() => {
    setSuccess(false);
    setErr("");
  }, [userListData, title, amount, eventdate]);

  //handle submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      title: title,
      userid: localStorage.getItem("userKey"),
      senderid: localStorage.getItem("userKey"),
      receiverids: userListData,
      amount: amount,
      eventdate: eventdate
    };
    await axios
      .post("/dashboard/sendRequest", obj)
      .then((res) => { 
        console.log(res.status);
        if (res.status == 200) {
         
          setSuccess(true);
          setErr("Request successfully sent");
        } else {
          setErr("Failed to send Request")
        }
      })
      .catch((error) => {
        
        setErr(error.response.data);
      });
  };

  return (
    <div className="requestForm">
      <form onSubmit={handleSubmit}>
        <div className="formContent padding border">
          <h2>Form</h2>
          {err == "" ? (
            <></>
          ) : (
            <p
              className="errorMessage"
              style={
                success
                  ? { color: "green", backgroundColor: "lightgreen" }
                  : undefined
              }
            >
              {err}
            </p>
          )}

          <input
            type="text"
            name="title"
            placeholder="Title of Event"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Bill Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type={type}
            name="title"
            placeholder="Event Date"
            onFocus={() => setType("date")}
            onBlur={() => setType("text")}
            value={eventdate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
          <input type="submit" name="submit" value="Send Request" />
        </div>
        <PeopleForm passData={passData} />
      </form>
    </div>
  );
};
export default NewForm;

