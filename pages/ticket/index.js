import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Center, Container, Flex, Text, useToast } from "@chakra-ui/react";

import TicketCard from "../../components/TicketCard";
import { getData_Local } from "../../services/StorageService";
import { getData } from "../../services/HttpService";
import CONFIG from "../../config/config.json";

function Ticket()
{
    const [ tickets, setTickets ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);
    const [ hasTicket, setHasTicket ] = useState(false);

    const toast = useToast();

    useEffect(() => {
        const userID = getData_Local("userId");
        const userTicketInfoUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${userID}/tickets`;

        if (!loaded)
        {
            getData(userTicketInfoUrl)
            .then((res) => {

                if (res.length == 0)
                {
                    setHasTicket(false);
                    setLoaded(true);
                    return;
                }

                console.log("Tickets Data:", res);
                setTickets(res);
                setHasTicket(true);
                setLoaded(true);
                return;
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
                hasTicket ?
                <>
                {
                    tickets.map((each, index) => {
                        return <TicketCard key={index} ticket={each} />
                    })
                }
                </>
                :
                <>
                {
                    <Flex>
                        <Center
                            px={"10%"}
                            py={"80%"}
                            textAlign={"center"}
                        >
                            You have no tickets. Register in events to buy tickets.
                        </Center>
                    </Flex>
                }
                </>                
            } 
        </Container>
        :
        <></>
    );

}

export default Ticket;