import React, { useState } from "react";
import "../stylesheets/newform.css";
import PeopleForm from "../components/newForm/PeopleForm";

const Admin = () => {
  const [type, setType] = useState("text");
  const [userListData, setUserListData] = useState([]);

  const passData = (data) => {
    setUserListData(data);
    console.log("parent: " + data);
  };

  return (
    <div className="requestForm">

    </div>
  );
};
export default NewForm;