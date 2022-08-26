import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Flex, Center } from "@chakra-ui/react";

//  Components
import {
    EventCard
} from "../components/EventCard";

import { getData } from "../services/HttpService";
import { getData_Local } from "../services/StorageService";
import CONFIG from "../config/config.json";


function MyEvents()
{
    const router = useRouter();
    const [ eventList, setEventList ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);

    //  Perform the API GET
    useEffect(() => {

        const participantId = getData_Local("userId");
        console.log("Here")

        if (!loaded)
        {
            console.log("In !loaded");
            const eventUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${participantId}/events`;
            console.log(eventUrl);

            getData(eventUrl)
                .then((res) => {
                    console.log("In promise then");
                    console.log(res);
                    setEventList(res);
                    setLoaded(true);
                })
                .then((res) => {
                    console.log("In then then");
                })
                .catch((err) => {
                    console.log("In catch")
                    console.error(err);
                    setLoaded(false);
                })    
        }
        else
        {
            console.log("In else");
        }

    });

    return (
        loaded ?
        <>
            <Box>
                {
                    eventList.map((event, index) => {
                        return <EventCard />
                    })
                }
            </Box>        
        </>
        :
        <>
                No
        </>
    );
}

export default MyEvents;