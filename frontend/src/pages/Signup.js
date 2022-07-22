import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  //init variables
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
  const [rePwd, setRePwd] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  //message and verification
  const [pwdErr, setPwdErr] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeMatch, setCodeMatch] = useState(false);

  //state of form to display, basic,email
  const [section, setSection] = useState("basic");

  //use navigate to go to other pages
  const navigate = useNavigate();

  //reference
  const formRef = useRef(null);

  //update values each of rendering
  useEffect(() => {
    if (pwd == rePwd || rePwd == "" || pwd == "") {
      setPwdErr(false);
    } else {
      setPwdErr(true);
    }
    setErrMsg("");
  }, [name, pwd, rePwd, username, pwdErr, email,code]);


  useEffect(() => {
    setCodeSent(false);
    setCodeMatch(false);
  }, [email]);
  
  //handle submit action
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userObject = {
      name: name,
      username: username,
      password: pwd,
      email: email,
    };
    if (codeMatch) {
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
    }
  };

  const handleNext = async (e) => {
    if (pwd == rePwd) {
      if (formRef.current.checkValidity()) {
        await axios
          .post("/auth/checkDup", { username: username })
          .then((res) => {
            console.log(res);
            if (res.data.noDuplicate) {
              setSection("email");
            } else {
              setErrMsg("Error: User Already Existed");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else formRef.current.reportValidity();
      //console.log(formRef.current.checkValidity());
    }
  };

  const sendCode = async (e) => {
    await axios
      .post("./email/sendCode", { email: email })
      .then((res) => {
        console.log(res);
        setCodeSent(res.data.isSent);
        if(!res.data.isSent){
          setErrMsg(res.data.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmCode = async (e) => {
    await axios
      .post("./email/confirmCode", { code: code, email: email })
      .then((res) => {
        console.log(res.data.isMatched);
        setCodeMatch(res.data.isMatched);
        if (!res.data.isMatched) setErrMsg(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //render elements section
  return (
    <div className="requestForm">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="formContent padding border">
          <h2>Splittr</h2>
          {errMsg != "" ? (
            <p className="errorMessage">{errMsg}</p>
          ) : !codeMatch?(
            <div></div>
          ):(<p className="errorMessage" style={{backgroundColor: "lightgreen", color:'green'}}>Code is Valid</p>)}
          {section == "basic" ? (
            <section className="flex-column">
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

              <input
                type="button"
                name="next"
                value="Next"
                onClick={handleNext}
              />

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
            </section>
          ) : section == "email" ? (
            <section className="flex-column">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <div style={{ width: "260px", marginBottom:"35px"}}>
                <input
                  type="number"
                  name="code"
                  placeholder="6 Digit Codes"
                  onChange={(e) =>{setCode(e.target.value)}}
                  value={code}
                  required
                  maxLength="6"
                  onBlur={confirmCode}
                  style={{width: "145px", verticalAlign: "middle", margin:"0" }}
                />
                <button
                  type="button"
                  onClick={sendCode}
                  style={
                    codeSent
                      ? {
                          backgroundColor: "green",
                          pointerEvents: 'none',
                          margin: "0",
                          marginLeft: "15px",
                          borderRadius: "0",
                          width: "90px",
                          height: "45px",
                          verticalAlign: "middle",
                       
                        }
                      : {
                          margin: "0",
                          marginLeft: "15px",  
                          borderRadius: "0",
                          width: "90px",
                          height: "45px",
                          verticalAlign: "middle",
                      
                        }
                  }
                >
                  {!codeSent ? "Send Code" : "Sent ✓"}
                </button>
              </div>

              <input
                type="submit"
                name="createaccount"
                value="Create Account"
              />
            </section>
          ) : (
            <h1>Page Error</h1>
          )}
        </div>
      </form>
    </div>
  );
};
export default Signup;
