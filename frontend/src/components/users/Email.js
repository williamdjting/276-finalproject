import React from "react";
import { useState, useEffect } from "react";
import EditIcon from "../../icons/edit.svg";
import "../../stylesheets/userInfo.css";
import axios from "axios";

const Email = (props) => {
  const [input, setInput] = useState(props.email);
  const [code, setCode] = useState("");
  const [activated, setActivated] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isSent, setIsSent] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSend = async (e) => {
    await axios
      .post("./email/sendCode", { email: input })
      .then((res) => {
        console.log(res);
        setIsSent(res.data.isSent);
        props.setMssg("Code sent, please check email and enter below");
        props.setErr(false);

        //if code did not sent
        if (!res.data.isSent) {
          props.setMssg(res.data.status);
          props.setErr(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    if (isValid) {
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
            props.setMssg("Email address is updated");
            props.setErr(false);
            setIsValid(false);
            setCode("");
            setIsSent(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const confirmCode = async (e) => {
    await axios
      .post("./email/confirmCode", { code: code, email: input })
      .then((res) => {
        console.log(res.data.isMatched);
        if (res.data.isMatched) {
          props.setMssg("Code is valid, click submit to update email");
          props.setErr(false);
          setIsValid(true);
        }

        if (!res.data.isMatched) {
          props.setMssg(res.data.status);
          props.setErr(true);
          setIsValid(false);
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
          {!isSent ? (
            <input
              type="text"
              name="email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <input
              type="text"
              name="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setIsValid(false);
              }}
              onBlur={confirmCode}
              placeholder="Enter 6 Digit Code"
              autoComplete="false"
            />
          )}

          <div style={{ whiteSpace: "nowrap" }}>
            {!isSent ? (
              <button
                onClick={handleSend}
                style={{ padding: "5px 15px", width: "auto" }}
              >
                send code
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                style={{ padding: "5px 15px", width: "auto" }}
              >
                submit
              </button>
            )}
            <button
              onClick={() => {
                setActivated(false);
                setInput(props.email);
                props.setErr(false);
                props.setMssg("");
                setIsValid(false);
                setCode("");
                setIsSent(false);
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
              props.setErr(false);
              props.setMssg("");
            }}
          >
            <img src={EditIcon} alt="edit icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Email;
