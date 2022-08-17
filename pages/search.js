import { useState } from 'react';
import Router from "next/router";
import FormTitle from "../components/Form/FormTitle";

import {Stack, Image, Flex, Avatar, Box, Text, Spacer, Button, Textarea, Center, Input, Container, VStack} from "@chakra-ui/react";
import { postData } from '../services/HttpService';
import {getData_Local, storeData_Local} from '../services/StorageService';

const Search = () => {

    const [search, setSearch] = useState('');

    const handleSearchChange = () => {
        console.log("Value: ",search);
        
        // const eventUrl = '';
        // const payload = {
        //     evenName: search
        // }

        // postData(eventUrl, payload)
        // .then((data) => {
        //     console.log("Response data:", data);
        //     storeData_Local("token", data.token);
        // }).catch((err) => {
        //     console.log(err);
        // });
    }

    return (

        <div className="page_style">
            <FormTitle title="Search" />

            <VStack>
                <Container maxW='2xl' >
                    <Flex>
                        <Input type='text' variant='filled' placeholder='Search...' value={search} onChange={(e) => {setSearch(e.target.value)}} />
                        <Spacer/>
                        <Button colorScheme='teal' variant='solid' onClick={() => handleSearchChange()}>
                            Search
                        </Button>
                    </Flex>
                </Container>
            </VStack>

            
        
        </div>

    );
}

export default Search;