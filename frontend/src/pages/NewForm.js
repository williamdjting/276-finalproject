import React, { useState, useEffect } from "react";
import "../stylesheets/newform.css";
import deleteIcon from "../icons/close.svg";
import PeopleForm from "../components/newForm/PeopleForm";
import axios from "axios";


import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

const stripePromise = loadStripe("pk_test_51LQ5kqFl5V6uZIiCIjcQb015y8PRJIeXMbefpgurZwW3erqXOsr5QuToRxJmRnWhcftUZc55Wkto3n9vQydFbsbi00uGehax1M");



const NewForm = () => {
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
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default NewForm;
