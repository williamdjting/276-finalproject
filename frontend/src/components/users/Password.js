import React from "react";
import { useState, useEffect } from "react";
import EditIcon from "../../icons/edit.svg";
import "../../stylesheets/userInfo.css";
import axios from "axios";

const Password = (props) => {
  const [input, setInput] = useState("");
  const [activated, setActivated] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    const userObject = {
      input,
      id: props.id,
    };

    await axios
      .post("/admindata/modify/password", userObject)
      .then((res) => {
        if (res.status == 200) {
          setSuccess(true);
          setActivated(false);
          setInput("");
          props.setMssg("Password has changed");
          props.setErr(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile">
      <h3>Password</h3>
      {activated ? (
        <div className="container" style={{ alignItems: "baseline" }}>
          <input
            type="text"
            name="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter New Password"
          />
          <div style={{ whiteSpace: "nowrap" }}>
            <button onClick={handleSave}>save</button>
            <button
              onClick={() => {
                setActivated(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <button
            style={{
              width: "190px",
              margin: "5px 0 15px 0",
              borderRadius: "0",
              height: "50px",
            }}
            onClick={() => {
              setActivated(true);
              props.setMssg("");
              props.setErr(false);
            }}
          >
            Change Password
          </button>
        </div>
      )}

    </div>
  );
};

export default Password;
