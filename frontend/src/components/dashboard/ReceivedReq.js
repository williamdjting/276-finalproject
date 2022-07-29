// approach:
// Create an api end point that displays all our database data in json format via that path

// FetchAPI custom hook that then queries that and holds that array of objects in a a variable

// Can call fetchapi in any component that needs to display data and within the component manipulate and map the fetchapi object to suit the components needs.

import React, { useEffect, useState } from "react";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

const stripePromise = loadStripe("pk_test_51LQ5kqFl5V6uZIiCIjcQb015y8PRJIeXMbefpgurZwW3erqXOsr5QuToRxJmRnWhcftUZc55Wkto3n9vQydFbsbi00uGehax1M");


function FetchAPI13() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "pay 50" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const [data, setData] = useState([]);
  const [names, setNames] = useState([]);

  const userid = localStorage.getItem("userKey");

  const apiGet = async () => {
    await axios
      .get("/dashboard/requestReceived/" + userid)
      .then((res) => {
        setData(res.data.result);
        setNames(res.data.userlist);
        //console.log(res.data.userlist)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    apiGet();
  }, []);

  return (
    <div className="items">
      {data.map((item) => (
        <div key={item.reqid} className="item">
          <h4 className="item-1">{item.title} </h4>
          <p className="item-2">{"from " + names[item.receiverid]}</p>
          <p className="item-3">{"$" + item.amount}</p>
          <p className="item-4">{item.eventdate}</p>
          <button className="item-5">pay</button>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      ))}
    </div>
  );
}

export default FetchAPI13;
