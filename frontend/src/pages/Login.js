import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/newform.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [id, setID] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [post, setPost] = useState(null);

  const userRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userObject = {
      username: user,
      password: pwd,
      userid: id,
    };

    localStorage.setItem('userKey', id);

    console.log(userObject);
    await axios
      .post("/auth/login", userObject)
      .then((res) => {
        console.log(res.data);

        if (res.data.login) {
          setUser("");
          setPwd("");
          setID("");
          //setSuccess(true);

          //set Auth = true
          login(res.data, user).then(() => {
            navigate("/");
          });
        } else {
          setErrMsg(res.data.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="/">Go to Home</a>
          </p>
        </section>
      ) : (
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
                name="username"
                placeholder="Email or Username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />

              <input type="submit" name="login" value="Log In" />

              <input
                type="button"
                name="signup"
                value="Sign Up"
                className="signUp"
                onClick={() => (window.location.href = "/signup")}
              />

              <a
                href="/login"
                style={{
                  fontSize: "14px",
                  alignSelf: "flex-end",
                  marginTop: "30px",
                }}
              >
                forget your password?
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default Login;
