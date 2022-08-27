import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { getData, postData, postDate } from "./services/HttpService";
import CONFIG from "./config/config.json";



function CheckoutPage()
{
    //  TODO
    const orderId = "6308bbba36be9d560d1b0c8e";

    function onToken(token)
    {
        console.log("Token", token);

        const stripeBackendUrl = `${CONFIG.BASE_URL.PAYMENT}/api/payment/participant`;
        const payload = {
            order_id: orderId,
            token: token.id
        }

        postData(stripeBackendUrl, payload)
        .then((res) => {
            console.log("Response:", res);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    return (
        <StripeCheckout
            token={onToken}
            stripeKey={CONFIG.STRIPE_PK}
        />
    )

}

export default CheckoutPage;