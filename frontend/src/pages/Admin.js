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

    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    const dataForForm = (id, username, nickname) => {
        setID(id);
        setUsername(username);
        setNickname(nickname);
    }
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

  //HTML render out
  return (
    <div className="admin">
      <div>
        <h1>Manage Splittr Accounts</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nick Name</th>
              <th>Username</th><th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nickname}</td>
                <td>{item.username}</td>
                <td>
                        <button type="button" onClick={(e) => { dataForForm(item.id, item.username, item.nickname ); setVisibility(!visibility); }}>Modify</button>
                  <button type="button">Delete</button>
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
