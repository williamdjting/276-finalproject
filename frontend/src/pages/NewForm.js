import React, { useState } from "react";
import "../stylesheets/newform.css";
import deleteIcon from "../icons/close.svg";
import PeopleForm from "../components/newForm/PeopleForm";

const NewForm = () => {
  const [type, setType] = useState("text");
  const [userListData, setUserListData] = useState([]);

  const passData = (data) => {
    setUserListData(data);
    console.log("parent: " + data);
  };

  return (
    <div className="requestForm">
      <form>
        <div className="formContent padding border">
          <h2>Form</h2>
          <input type="text" name="title" placeholder="Title of Event" />
          <input type="number" name="amount" placeholder="Bill Amount" />
          <input
            type={type}
            name="title"
            placeholder="YYYYMM/DD"
            onFocus={() => setType("date")}
            onBlur={() => setType("text")}
          />
          <input type="submit" name="submit" value="Send" />
        </div>
        <input type="hidden" name="userList" value={userListData} />
        <PeopleForm passData={passData} />
      </form>
    </div>
  );
};
export default NewForm;
