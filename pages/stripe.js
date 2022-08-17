import React from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardElement,
    Elements,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";


function CheckoutForm()
{
    const stripe = useStripe();
    const elements = useElements();

    async function handleSubmit(event)
    {
        event.preventDefault();

        if (elements == null)
        {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
}


function Stripe()
{
    const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
    );
}


export default Stripe;