import React, { useState, useEffect } from "react";
import "../stylesheets/admin.css";
import axios from "axios";
import PopUpForm from "../components/admin/PopUpForm";

const Admin = () => {
  //init variables
  const [accounts, setAccounts] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const [id, setID] = useState();
  const [username, setUsername] = useState();
  const [nickname, setNickname] = useState();

  const [input, setInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [mss, setMss] = useState("");
  const [deleteMss, setDeleteMss] = useState("");

  const popupCloseHandler = (e) => {
    setVisibility(e);
    setInput("");
    setSuccess(false);
  };

  //get the data for popup form
  const dataForForm = (id, username, nickname) => {
    setID(id);
    setUsername(username);
    setNickname(nickname);
  };

  //fetch the accounts data
  const fetchAccounts = async () => {
    const res = await axios
      .get("/admindata/accounts")
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  //change data in database
  const handleChange = async (op) => {
    const userObject = {
      input,
      id,
    };
    console.log(userObject);
    await axios
      .post("/admindata" + op, userObject)
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          setInput("");
          setSuccess(true);
          setMss(res.data);
          fetchAccounts();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

   //delete data in database
   const handleDelete = async (op) => {
    console.log(op);
    await axios
      .post("/admindata" + op)
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          setInput("");
          setSuccess(true);
          setDeleteMss(res.data);
          fetchAccounts();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //HTML render out
  return (
    <div className="admin">
      <PopUpForm
        onClose={popupCloseHandler}
        show={visibility}
        title={"User ID - " + id}
      >
        {(success&&visibility) ? <p>{mss}</p> : <div></div>}
        <input
          type="text"
          name="content"
          placeholder="Content"
          autoComplete="off"
          onChange={(e) => {
            setInput(e.target.value);
            setSuccess(false);
          }}
          value={input}
          required
          maxLength={20}
        />

        <button
          type="button"
          className="option"
          onClick={(e) => {
            handleChange("/modify/nickname");
          }}
        >
          Change Nickname
        </button>

        <button type="button" className="option"  onClick={(e) => {
            handleChange("/modify/password");
          }}>
          Change Password
        </button>

        <button type="button" className="delete"  onClick={(e) => {
            handleDelete("/delete/user/"+id);
            setVisibility(!visibility);
          }}>
          Delete User
        </button>

      </PopUpForm>
      <div>
        <h1>Manage Splittr Accounts</h1>
        {(success&&!visibility) ? <p>{deleteMss}</p> : <div></div>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nick Name</th>
              <th>Username</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((item) => (
              <tr key={item.userid}>
                <td>{item.userid}</td>
                <td>{item.nickname}</td>
                <td>{item.username}</td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      dataForForm(item.userid, item.username, item.nickname);
                      setVisibility(!visibility);
                      setSuccess(false);
                    }}
                  >
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Admin;
