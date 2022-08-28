import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Flex, Center, Text } from "@chakra-ui/react";

//  Components
import EventCard from "../components/Event/EventCard";

import { getData } from "../services/HttpService";
import { getData_Local } from "../services/StorageService";
import CONFIG from "../config/config.json";


function MyEvents()
{
    const router = useRouter();
    const [eventList, setEventList] = useState(null);
    const [loaded, setLoaded] = useState(false);

    //  Perform the API GET
    useEffect(() => {
        const participantId = getData_Local("userId");

        if (!loaded)
        {
            console.log("In !loaded");
            const eventUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${participantId}/events`;
            console.log(eventUrl);

            getData(eventUrl)
            .then((res) => {
                console.log("In promise then");
                console.log(res);
                if (res.length > 0)
                {
                    setEventList(res);
                    setLoaded(true);    
                }
            })
            .catch((err) => {
                console.error(err);
            })
        }

    });

    return (
        loaded ?
            <Box>
                {
                    eventList.map((event, index) => {
                        return <EventCard key={index} eventId={event.id || event._id} />
                    })
                }
            </Box>
            :
            <>
            <Text
                fontSize={"md"}
                textAlign={"center"}
                mt={"70%"}
            >
                    {"You aren't subscribed to any events"}
            </Text>
            </>
    );
}

export default MyEvents;