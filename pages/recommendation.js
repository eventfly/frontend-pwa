import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Flex, Center } from "@chakra-ui/react";

//  Components
import EventCard from "../components/Event/EventCard";

import { getData, postData } from "../services/HttpService";
import { getData_Local } from "../services/StorageService";
import CONFIG from "../config/config.json";


function Recommendation()
{
    const router = useRouter();

    const [eventIdList, setEventIdList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    //  Perform the API GET
    useEffect(() => {
        const participantId = getData_Local("userId");

        if (!loaded) {
            console.log("In !loaded");
            const getRecomEventUrl = `${CONFIG.BASE_URL.ANALYTICS}/api/analytics/events`;
            console.log(getRecomEventUrl);

            const payload = {
                participantId: participantId,
                participantLng: 90.4331,
                participantLat: 23.7619
            };

            //  TODO UI
            postData(getRecomEventUrl, payload)
            .then((res) => {
                console.log("RECOM EVENTS : res");
                console.table(res);
                // setEventList(res);
                // setLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            })
        }
        else {
            console.log("In else");
        }

    });

    return (
        loaded ?
            <Box>
                {
                    eventList.map((event, index) => {
                        // return <EventCard key={index} eventId={event.id || event._id} />
                    })
                }
            </Box>
            :
            <></>
    );
}

export default Recommendation;