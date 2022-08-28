import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

import EventCard from "../../components/Event/EventCard";
import CONFIG from "../../config/config.json";
import { getData, postData } from "../../services/HttpService";


function SearchResult()
{
    const router = useRouter();
    const [ queryString, setQueryString ] = useState("");
    const [ searchResults, setSearchResults ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);
    //  Perform the API GET

    useEffect(() => {

        const { query } = router.query;
        setQueryString(query);

        const textSearchUrl = `${CONFIG.BASE_URL.ANALYTICS}/api/analytics/search/query`;
        const payload = {
            query: query
        };

        if (!loaded)
        {
            postData(textSearchUrl, payload)
            .then((res) => {
                if (res.events) 
                {
                    if (res.events.length > 0)
                    {
                        setSearchResults(res.events);
                        console.log("QUERY SEARCH")
                        console.table(res);
                        setLoaded(true);        
                    }
                }
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
                searchResults.map((eventId, index) => {
                    return (
                        <EventCard key={index} eventId={eventId} />
                    )
                })
            }
        </Box>
        :
        <Heading
            fontWeight={"normal"}
            textAlign={"center"}
            fontSize={"md"}
            mt={"70%"}
        >
            No events found using search query: {`'${queryString}'`}
        </Heading>
    );
}

export default SearchResult;