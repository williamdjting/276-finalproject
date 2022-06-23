import React from "react";
import "../stylesheets/newform.css";

const Login = () => {
  return (
    <div className="requestForm">
      <form>
        <div className="formContent padding border">
          <h2>Splittr</h2>
          <input type="text" name="username" placeholder="Email or Username" />
          <input type="password" name="password" placeholder="Password" />

          <input type="submit" name="login" value="Log In" />

          <input
            type="submit"
            name="signup"
            value="Sign Up"
            className="signUp"
          />

          <a
            href="/"
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
