import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  //init variables
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
  //const [email, setEmail] = useState("");
  const [rePwd, setRePwd] = useState("");

  //message and verification
  const [pwdErr, setPwdErr] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  //update values each of rendering
  useEffect(() => {
    if (pwd == rePwd || rePwd == "" || pwd == "") {
      setPwdErr(false);
    } else {
      setPwdErr(true);
    }
    setErrMsg("");
  }, [name, pwd, rePwd, username, pwdErr]);

  //handle submit action
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userObject = {
      name: name,
      username: username,
      password: pwd,
      //email: email
    };

    console.log(userObject);
    await axios
      .post("/auth/signup", userObject)
      .then((res) => {
        console.log(res);
        if (res.data.signup) {
          navigate("/login");
        } else {
          setErrMsg("Error: User Already Existed");
        }
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
          {errMsg != "" ? (
            <p className="errorMessage">{errMsg}</p>
          ) : (
            <div></div>
          )}
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            maxLength="10"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            maxLength="20"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            maxLength="20"
          />
          <input
            type="password"
            name="repassword"
            placeholder="Re-Enter Password"
            onChange={(e) => setRePwd(e.target.value)}
            value={rePwd}
            required
            maxLength="20"
            style={{ marginBottom: "10px" }}
          />
          {pwdErr ? (
            <p className="subErrorMessage">Error: Passwords Not Match</p>
          ) : (
            <div></div>
          )}
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
