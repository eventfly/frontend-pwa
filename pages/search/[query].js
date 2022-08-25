import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

//  Components
import {
    SearchResultCardBasic,
    SearchResultCardImageRow,
    SearchResultCardImageColumn
} from "../../components/SearchResultCard";


function SearchResult()
{
    const router = useRouter();
    const [ searchResults, setSearchResults ] = useState(null);

    //  Perform the API GET

    useEffect(() => {
        const { query } = router.query;
        console.log("Search query string: ", query);

        
    });

    return (
        <Box>
            <SearchResultCardBasic />
            <SearchResultCardImageColumn />
            <SearchResultCardImageRow />
        </Box>
    );
}

export default SearchResult;