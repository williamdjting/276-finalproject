import React from "react";
import { useState, useEffect } from "react";
import Nickname from "../components/users/Nickname";
import Password from "../components/users/Password";
import Email from "../components/users/Email";
import axios from "axios";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [mssg, setMssg] = useState("");
  const [err, setErr] = useState(false);

  const handleMessage = (data) => {
    setMssg(data);
  };

  const handleError = (data) => {
    setErr(data);
  };
  //useEffect
  useEffect(() => {
    getUserInfo();
  });

  const getUserInfo = async () => {
    const user = localStorage.getItem("username");
    await axios
      .post("/profile/get/userInfo", { username: user })
      .then((res) => {
        setNickname(res.data.nickname);
        setEmail(res.data.email);
        setId(res.data.userid);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{marginBottom:"55px"}}>
      <h2 style={{ marginTop: "55px" }}>Personal Information</h2>
      {mssg == "" ? (
        <></>
      ) : (
        <p
          className="errorMessage"
          style={
            !err
              ? {
                  width: "550px",
                  margin: "auto",
                  backgroundColor: "lightgreen",
                  color: "green",
                }
              : { width: "550px", margin: "auto" }
          }
        >
          {mssg}
        </p>
      )}

      <Nickname nickname={nickname} id={id} setMssg={handleMessage} setErr={handleError} />
      <Email email={email} id={id} setMssg={handleMessage} setErr={handleError}/>
      <Password id={id} setMssg={handleMessage} setErr={handleError}/>
    </div>
  );
};

export default Profile;
