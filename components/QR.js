import QRCode from "react-qr-code";
import { useState, useEffect } from "react";


function QR(props)
{
    const [ loaded, setLoaded ] = useState(false);
    const [ ticketID, setTicketID ] = useState("");

    useEffect(() => {
        if (!loaded)
        {
            setTicketID(props.ticketID);
            setLoaded(true);
        }
    });

    return (
        loaded ?
            <QRCode value={ ticketID } />
        :
           <></>
    );
}

export default QR;