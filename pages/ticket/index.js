import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";

import TicketCard from "../../components/TicketCard";
import { getData_Local } from "../../services/StorageService";
import { getData } from "../../services/HttpService";
import CONFIG from "../../config/config.json";

function Ticket()
{
    const [ tickets, setTickets ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        const userID = getData_Local("userId");
        const userTicketInfoUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${userID}/tickets`;

        if (!loaded)
        {
            getData(userTicketInfoUrl)
            .then((res) => {
                console.log("Tickets Data:", res);
                setTickets(res);
                setLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            })    
        }
        
    });

    return (
        loaded ?
        <Container>
        {
            tickets.map((each, index) => {
                return <TicketCard key={index} ticket={each} />
            })
        }
        </Container>
        :
        <>
        </>
    );

}

export default Ticket;