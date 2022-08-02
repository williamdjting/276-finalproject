import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    setMessage("");
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(null);
          
          axios
            .post("/request/pay-successful", {
              //reqid={reqid} receiverid={receiverid} amount={amount} setSuccessPay={setSuccessPay}
              userid: localStorage.getItem("userKey"),
              reqid: props.reqid,
              receiverid: props.receiverid,
            })
            .then(
              (res) => {
                props.setSuccess(true);
                console.log("Payment successful, request has been closed");
              },
              (error) => {
                console.log(
                  "Error: Payment was successful, but request failed to close"
                );
              }
            );
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    setIsLoading(false);
  };

  const handleClick = (event) => {
    console.log(event.currentTarget.id);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="errorMessage">{message}</div>}

      <PaymentElement id="payment-element" />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="pay-button"
        onClick={handleClick}
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner">
              Loading...
            </div>
          ) : (
            "Pay $" + props.amount
          )}
        </span>
      </button>
    </form>
  );
}
