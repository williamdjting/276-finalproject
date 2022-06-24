import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../stylesheets/newform.css";
import deleteIcon from "../../icons/close.svg";

const PeopleForm = ({ passData }) => {
  const [input, setInput] = React.useState("");
  const [userList, setUserList] = React.useState([]);

  const saveInput = (e) => {
    setInput(e.target.value);
  };

  const addNewUser = () => {
    if (userList.indexOf(input) == -1) {
      setUserList((prevState) => [...prevState, input]);
    }
  };

  useEffect(() => {
    passData(userList);
  }, [userList]);
  /*
  const removeUser = (index) => {
    setTimeout(() => {
      setUserList([
        ...userList.slice(0, index),
        ...userList.slice(index + 1, userList.length),
      ]);
    }, 1);
  };
*/
  return (
    <div
      className="formContent padding border"
      style={{ alignItems: "flex-start" }}
    >
      <h3 style={{ alignSelf: "flex-start" }}>Add People</h3>
      <div style={{ width: "360px" }}>
        <input
          type="text"
          name="addUserTo"
          value={input}
          onChange={saveInput}
          placeholder="Email Address"
        />
        <button type="button" onClick={addNewUser}>
          Add
        </button>
      </div>

      {/* Interactive User List */}
      <TransitionGroup component="ul">
        {userList.reverse().map((item, index) => (
          <CSSTransition timeout={500} key={item} classNames="userInFormList">
            <li key={item}>
              <p>{item}</p>

              <img
                src={deleteIcon}
                alt="delete"
                className="deleteIcon"
                onClick={() => {
                  setUserList(userList.filter((t) => t !== item));
                  passData(userList);
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
