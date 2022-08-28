import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Flex, Center, Text } from "@chakra-ui/react";

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

    const [gpsOn, setGpsOn] = useState(false);
    const [userLat, setUserLat] = useState(0);
    const [userLong, setUserLong] = useState(0);

    //  Perform the API GET
    useEffect(() => {
        const participantId = getData_Local("userId");

        //  Check if we have access to GPS
        navigator.geolocation.getCurrentPosition((data) => {
            setUserLong(data.coords.longitude);
            setUserLat(data.coords.latitude);
            setGpsOn(true);
        });

        if (!loaded) {
            var getRecomEventUrl = "";
            var payload = {};

            if (gpsOn) {
                getRecomEventUrl = `${CONFIG.BASE_URL.ANALYTICS}/api/analytics/events/`;
                payload = {
                    participantId: participantId,
                    participantLng: userLong,
                    participantLat: userLat
                };
            }
            else {
                getRecomEventUrl = `${CONFIG.BASE_URL.ANALYTICS}/api/analytics/events/no-loc`;
                payload = {
                    participantId: participantId
                };
            }

            postData(getRecomEventUrl, payload)
                .then((res) => {
                    if (res.events) {
                        if (res.events.length > 0) {
                            setEventIdList(res.events);
                            setLoaded(true);        
                        }                        
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
                    eventIdList.map((eventId, index) => {
                        return <EventCard key={index} eventId={eventId} />
                    })
                }
            </Box>
            :
            <Text
                fontSize={"md"}
                textAlign={"center"}
                mt={"70%"}
            >
                {"Currently, you have no recommendations."}
            </Text>
    );
}

export default Recommendation;