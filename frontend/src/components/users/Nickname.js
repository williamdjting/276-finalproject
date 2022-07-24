import React from "react";
import { useState, useEffect } from "react";
import EditIcon from "../../icons/edit.svg";
import "../../stylesheets/userInfo.css";
import axios from "axios";

const Nickname = (props) => {
  const [input, setInput] = useState(props.nickname);
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
      .post("/admindata/modify/nickname", userObject)
      .then((res) => {
        if (res.status == 200) {
          setSuccess(true);
          setActivated(false);
          props.setMssg("Nickname has changed");
          props.setErr(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile">
      <h3>Nickname</h3>
      {activated ? (
        <div className="container" style={{ alignItems: "baseline" }}>
          <input
            type="text"
            name="nickname"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          <div style={{ whiteSpace: "nowrap" }}>
            <button onClick={handleSave}>save</button>
            <button
              onClick={() => {
                setActivated(false);
                setInput(props.nickname);
                props.setErr(false);
                props.setMssg("");
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <p>{props.nickname}</p>
          <button
            className="icon"
            onClick={() => {
              setActivated(true);
              setInput(props.nickname);
              props.setMssg("");
              props.setErr(false);
            }}
          >
            <img src={EditIcon} alt="edit icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Nickname;
