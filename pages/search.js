import { useState } from 'react';
import Router from "next/router";
import FormTitle from "../components/Form/FormTitle";

import {Stack, Image, Flex, Avatar, Box, Text, Spacer, Button, Textarea, Center, Input, Container, VStack} from "@chakra-ui/react";
import { postData } from '../services/HttpService';
import {getData_Local, storeData_Local} from '../services/StorageService';



const Search = () => {

    const [search, setSearch] = useState('');

    function handleSearch()
    {
        const searchElem = document.getElementById("search");
        const searchString = searchElem.value;
    }

    return (

        <div className="page_style">
            <FormTitle title="Search" />

            <VStack>
                <Container maxW='2xl' >
                    <Flex>
                        <Input type='text' id='search' variant='filled' placeholder='Search...' value={search} onChange={(e) => {setSearch(e.target.value)}} />
                        <Spacer/>
                        <Button colorScheme='teal' variant='solid' onClick={handleSearch}>
                            Search
                        </Button>
                    </Flex>
                </Container>
            </VStack>

            
        
        </div>

    );
}

export default Search;