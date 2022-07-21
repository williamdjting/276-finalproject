import React from "react";
import { useState, useEffect } from "react";
import EditIcon from "../../icons/edit.svg";
import "../../stylesheets/userInfo.css";
import axios from "axios";

const Email = (props) => {
  const [input, setInput] = useState(props.email);
  const [activated, setActivated] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    const userObject = {
      input,
      id: props.id,
    };
    console.log(input);
    console.log(props.id);
    await axios
      .post("/admindata/modify/email", userObject)
      .then((res) => {
        if (res.status == 200) {
          setSuccess(true);
          setActivated(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile">
      <h3>Email</h3>
      {activated ? (
        <div className="container" style={{ alignItems: "baseline" }}>
          <input
            type="text"
            name="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div>
            <button onClick={handleSave}>save</button>
            <button
              onClick={() => {
                setActivated(false);
                setInput(props.email);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <p>{props.email}</p>
          <button
            className="icon"
            onClick={() => {
              setActivated(true);
              setInput(props.email);
            }}
          >
            <img src={EditIcon} alt="edit icon" />
          </button>
        </div>
      )}

      {success ? <p>Email has changed</p> : <></>}
    </div>
  );
};

export default Email;
