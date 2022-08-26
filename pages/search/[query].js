import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import EventCard from "../../components/Event/EventCard";
import CONFIG from "../../config/config.json";
import { getData } from "../../services/HttpService";


function SearchResult()
{
    const router = useRouter();
    const [ searchResults, setSearchResults ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);
    //  Perform the API GET

    useEffect(() => {

        if (!router.isReady) {
            return;
        }

        const { query } = router.query;
        console.log("Search query string: ", query);
        const textSearchUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/search?query=${query}`;

        if (!loaded)
        {
            getData(textSearchUrl)
            .then((res) => {
                setSearchResults(res.events);
                console.table(res);
                setLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            });
        }

    });

    return (
        loaded ?
        <Box>
            {
                searchResults.map((event, index) => {
                    return (
                        <EventCard key={index} event={event} />
                    )
                })
            }
        </Box>
        :
        <></>
    );
}

export default SearchResult;