import React, { useState, useEffect, userRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../stylesheets/newform.css";
import deleteIcon from "../../icons/close.svg";
import axios from "axios";

const PeopleForm = ({ passData }) => {
  const [input, setInput] = React.useState("");
  const [userList, setUserList] = React.useState([]);
  const [reverseList, setReverseList] = React.useState([]);
  const [err, setErr] = React.useState("");
  const [arr, setArr] = React.useState([]);
  //nodeRef = useRef();
  //update input
  const saveInput = (e) => {
    setInput(e.target.value);
    setErr("");
  };

  //validate user when adding to list
  const handleAddUser = async () => {
    console.log("Arr: " + arr);
    console.log("Input: " + input);
    console.log("List: " + userList);

    if (input == localStorage.getItem("userKey")) {
      setErr("You cannot add yourself");
    } else {
      await axios
        .post("/dashboard/verify/user", { input: input, arr: arr })
        .then((res) => {
          console.log("response: " + JSON.stringify(res.data));
          if (res.data.valid) {
            if (userList.indexOf(input) == -1) {
              setUserList((prevState) => [...prevState, input]);
              setArr((prevState) => [...prevState, res.data.userid]);
            }
          } else {
            setErr(res.data.status);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const removePeople = (index) => {
    setArr([...arr.slice(0, index), ...arr.slice(index + 1, arr.length)]);
  };

  //use Effect
  useEffect(() => {
    passData(arr);
    setReverseList(userList);
    reverseList.reverse();
    setErr("");
  }, [userList]);

  return (
    <div
      className="formContent padding border"
      style={{ alignItems: "flex-start" }}
    >
      <h3 style={{ alignSelf: "flex-start" }}>People List</h3>
      {err == "" ? <></> : <p className="errorMessage">{err}</p>}
      <div style={{ width: "360px" }}>
        <input
          type="text"
          name="addUserTo"
          value={input}
          onChange={saveInput}
          placeholder="Email or Username"
        />
        <button type="button" onClick={handleAddUser}>
          Add
        </button>
      </div>

      {/* Interactive User List */}
      <TransitionGroup component="ul">
        {reverseList.map((item) => (
          <CSSTransition timeout={500} key={item} classNames="userInFormList">
            <li key={item}>
              <p className="listitem">{item}</p>
              <img
                src={deleteIcon}
                alt="delete"
                className="deleteIcon"
                onClick={() => {
                  removePeople(userList.indexOf(item));
                  setUserList(userList.filter((t) => t !== item));
                }}
              />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
export default PeopleForm;
