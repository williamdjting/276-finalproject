import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
  //const [email, setEmail] = useState("");
  const [rePwd, setRePwd] = useState("");
  const[success, setSuccess] = useState("false");

  useEffect(() => {
    //setErrMsg("");
  }, [name, pwd, rePwd, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userObject = {
      name: name,
      username: username,
      password: pwd,
      //email: email
    };

    console.log(userObject);
    axios
      .post("/auth/signup", userObject)
      .then((res) => {
        console.log(res);
        //setName("");
        //setUsername("");
        //setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="requestForm">
      <form onSubmit={handleSubmit}>
        <div className="formContent padding border">
          <h2>Splittr</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            maxlength="10"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            maxlength="20"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            maxlength="20"
          />
          <input
            type="password"
            name="repassword"
            placeholder="Re-Enter Password"
            onChange={(e) => setRePwd(e.target.value)}
            value={rePwd}
            required
            maxlength="20"
          />

          <input type="submit" name="createaccount" value="Create" />
          <a
            href="/login"
            style={{
              fontSize: "14px",
              alignSelf: "flex-end",
              marginTop: "30px",
            }}
          >
            Sign in instead
          </a>
        </div>
      </form>
    </div>
  );
};
export default Signup;
