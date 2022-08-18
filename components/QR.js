import QRCode from "react-qr-code";

function QR({ props })
{
    // const ticketID = props.ticketID;
    const ticketID = "62fd6351966efa640cba3a52";

    return (
        <QRCode value={ticketID} />
    );
}

export default QR;