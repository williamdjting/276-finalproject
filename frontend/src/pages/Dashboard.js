import React, { useState, useEffect } from "react";
import "../stylesheets/dashboard/dashboard.css";
import "../stylesheets/dashboard/fetch.css";
import "../stylesheets/dashboard/component.css";

// import DummyForm from '../components/dashboard/DummyForm'; //dummyForm.js is not used anymore
import Component11 from "../components/dashboard/component11";
import Component12 from "../components/dashboard/SentReq";
import Component13 from "../components/dashboard/ReceivedReq";
import Component21 from "../components/dashboard/history";

//stripe Check Out
import CheckoutForm from "../components/dashboard/CheckOut";
import PopUpForm from "../components/admin/PopUpForm";
// import Component31 from '../components/dashboard/component31';

const Dashboard = () => {
  const [state, setState] = useState(true);
  const [hover, setHover] = useState(false);
  const [visibility, setVisibility] = useState(false);

  //use to switch between different elements on pop up
  const [category, setCategory] = useState("");

  //success state
  const [success, setSuccess] = useState(false);

  //data to show in invoice and data for payment
  const [eventDate, setEventDate] = useState("");
  const [names, setNames] = useState([]);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [title, setTitle] = useState("");
  const [reqid, setReqid] = useState("");
  const [amount, setAmount] = useState(0);
  const [receiverid, setReceiverID] = useState("");
  const [paid, setPaid] = useState([]);
  const [unpaid, setUnpaid] = useState([]);

  //close pop up window
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  //get receiver id
  const passReceiverID = (data) => {
    setReceiverID(data);
  };

  //set success
  const setSuccessPay = (data) => {
    setSuccess(data);
    setVisibility(false);
    console.log("payment succesful");
  };

  //communicate Pop Up with child elements
  const passData = (
    visibility,
    category,
    title,
    invoiceDate,
    eventDate,
    amount,
    names,
    reqid
  ) => {
    setVisibility(visibility);
    setTitle(title);
    setInvoiceDate(invoiceDate);
    setEventDate(eventDate);
    setAmount(amount);
    setNames(names);
    setCategory(category);
    setReqid(reqid);
  };

  //get paid and unpaid
  const passPaidUnPaid = (paid, unpaid) => {
    setPaid(paid);
    setUnpaid(unpaid);
  };

  useEffect(() => {
    setSuccess(false);
  }, [reqid, title, amount, names]);

  //render html elements
  return (
    <div>
      {success ? (
        <p
          className="errorMessage"
          style={{
            color: "green",
            backgroundColor: "lightgreen",
            textAlign: "center",
            margin: "0",
          }}
        >
          {"Payment to " + names[receiverid] + " is Successful"}
        </p>
      ) : (
        <></>
      )}


      <div className="dashboard">



        <Component11 passSuccess = {success}/>


        <div className="request-container placeholder">
          <h3>Requests</h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "25px",
            }}
            className="request-buttons"
          >
            <button
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
              style={
                state && !hover
                  ? { backgroundPosition: "right", color: "white" }
                  : undefined
              }
              className="option1"
              onClick={() => {
                setState(true);
              }}
            >
              Received
            </button>

            <button
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
              style={
                !state && !hover
                  ? { backgroundPosition: "left", color: "white" }
                  : undefined
              }
              className="option2"
              onClick={() => {
                setState(false);
              }}
            >
              Sent Out
            </button>
          </div>

          {state ? (
            <Component13 passData={passData} passReceiverID={passReceiverID} passSuccess = {success}/>
          ) : (
            <Component12 passData={passData} passPaidUnPaid={passPaidUnPaid} passSuccess = {success}/>
          )}
        </div>


        <Component21 passData={passData} passPaidUnPaid={passPaidUnPaid} passSuccess = {success}/>




        <PopUpForm
          onClose={popupCloseHandler}
          show={visibility}
          title={category}
        >


          {category == "Payment" ? (
            <CheckoutForm
              reqid={reqid}
              receiverid={receiverid}
              amount={amount}
              setSuccessPay={setSuccessPay}
            />
          ) : (


            <div className="invoice">
              {/*invoice for received req*/}
              <h2 style={{ padding: "0" }}>{title}</h2>

              <strong>Request ID </strong>
              <p>{reqid}</p>

              <strong>Paid Users</strong>
              {paid ? (
                <div>
                  {paid.map((item) => (
                    <p>{names[item]}</p>
                  ))}
                </div>
              ) : (
                <p>None Paid User</p>
              )}

              <strong>Unpaid Users</strong>
              {unpaid ? (
                <div>
                  {unpaid.map((item) => (
                    <p>{names[item]}</p>
                  ))}
                </div>
              ) : (
                <p>None UnPaid User</p>
              )}

              <strong>Invoice Date</strong>
              <p>{invoiceDate.substring(0, 10)}</p>
              <strong>Event Date</strong>
              <p>{eventDate}</p>
            </div>
          )}
        </PopUpForm>

      </div>
    </div>
  );
};
export default Dashboard;
