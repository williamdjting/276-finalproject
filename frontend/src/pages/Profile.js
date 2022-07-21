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
  const [render, setRender] = useState(0);

  const forceReRender = (i) => {
    setRender(i);
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
    <div>
      <h2 style={{ marginTop: "55px" }}>Personal Information</h2>

      <Nickname nickname={nickname} id={id} forceRender={forceReRender}/>
      <Email email={email} id={id} forceRender={forceReRender}/>
      <Password id={id} forceRender={forceReRender}/>
    </div>
  );
};

export default Profile;
