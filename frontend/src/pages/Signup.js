import React from "react";

const Signup = () => {
  return (
    <div className="requestForm">
      <form>
        <div className="formContent padding border">
          <h2>Splittr</h2>
          <input type="text" name="nickname" placeholder="Nick Name" />
          <input type="text" name="username" placeholder="Username or Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="repassword"
            placeholder="Re-Enter Password"
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
