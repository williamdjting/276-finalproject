import React, { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./StripeElement";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

const stripePromise = loadStripe(
  "pk_test_51LQ5kqFl5V6uZIiCIjcQb015y8PRJIeXMbefpgurZwW3erqXOsr5QuToRxJmRnWhcftUZc55Wkto3n9vQydFbsbi00uGehax1M"
);

const CheckOut = (props) => {
  const [clientSecret, setClientSecret] = useState(null);
  const appearance = {
    theme: "stripe",
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: props.amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);


  return (
    <div className="App">
      {clientSecret && (
        <Elements
        stripe={stripePromise}
          options={{
            clientSecret,
            appearance,
          }}
          
        >
          <CheckoutForm
            reqid={props.reqid}
            receiverid={props.receiverid}
            amount={props.amount}
            setSuccessPay={props.setSuccessPay}
            clientSecret={clientSecret}
          />
        </Elements>
      )}
    </div>
  );
};
export default CheckOut;
