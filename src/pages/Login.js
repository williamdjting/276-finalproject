import React from "react";
import "../stylesheets/newform.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="requestForm">
      <form>
        <div className="formContent padding border">
          <h2>Splittr</h2>
          <input type="text" name="username" placeholder="Email or Username" />
          <input type="password" name="password" placeholder="Password" />

          <input
            type="button"
            name="login"
            value="Log In"
            onClick={() => (window.location.href = "/")}
          />

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
  );
};
export default Login;
