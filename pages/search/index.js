import { useState } from 'react';
import Router from "next/router";
import FormTitle from "../../components/Form/FormTitle";

import { Stack, Image, Flex, Avatar, Box, Text, Spacer, Button, Textarea, Center, Input, Container, VStack } from "@chakra-ui/react";
import { postData } from '../../services/HttpService';
import { getData_Local, storeData_Local } from '../../services/StorageService';


import {
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton,
} from '@chakra-ui/react'

import MapBox from '../../components/Map/MapBox'
import meterPerPixel from '../../components/Map/PixelToMeter';

const Search = () => {

    const radiusInPixel = 100;

    const [textSearch, setTextSearch] = useState('');
    const [locationSearch, setLocationSearch] = useState({
        lat: 23.8,
        long: 90.4,
        zoom: 10
    });

    const [searchMode, setSearchMode] = useState('text');

    const handleTextSearch = () => {
        console.log(textSearch);
    }

    const handleLocationSearch = () => {
        const zoomLevel = locationSearch.zoom;
        let radiusKM = meterPerPixel[zoomLevel] * radiusInPixel / 1000.0;

        const earthRadius = 6371;
        const earthCircumference = 2 * Math.PI * earthRadius;
        console.log("circumference: " + earthCircumference);

        const latDiff = 360 * radiusKM / earthCircumference;
        const longDiff = 360 * radiusKM / earthCircumference / Math.cos(locationSearch.lat * Math.PI / 180);


        //api call here/
        console.log("get events within ")
        console.log("latdiff: " + latDiff + " of " + locationSearch.lat);
        console.log("longdiff: " + longDiff + " of " + locationSearch.long);
    }

    const onDragMarker = (lat, lng) => {
        let newLoc = {
            lat: lat,
            long: lng,
            zoom: Math.round(locationSearch.zoom)
        }
        setLocationSearch(newLoc)
    }

    const onZoom = (zoom) => {
        let newLoc = {
            lat: locationSearch.lat,
            long: locationSearch.long,
            zoom: Math.round(zoom)
        }
        setLocationSearch(newLoc)
    }

    const changeSearchMode = (mode) => {
        setSearchMode(mode)
    }


    return (
        <>
            <Spacer h={8} />
            {
                searchMode == 'text' ? (
                    <VStack>
                        <Container maxW='xl' >
                            <Flex>
                                <Popover>
                                    {({ isOpen, onClose }) => (
                                        <>
                                            <PopoverTrigger>
                                                <Input type='text' id='search' variant='filled' placeholder='Search...' value={textSearch} onChange={(e) => { setTextSearch(e.target.value) }} />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverBody p={4}>
                                                    <VStack py={4} display='flex' flexDirection='column' alignItems='center'>
                                                        <Button rounded={'md'} colorScheme='blue' onClick={() => { changeSearchMode("location") }}>Search By Location Instead</Button>
                                                        <Button rounded={'md'} variant='ghost' onClick={onClose}>Cancel</Button>
                                                    </VStack>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </>
                                    )}
                                </Popover>

                                <Spacer px={4} />
                                <Button w={32} colorScheme='teal' variant='solid' onClick={handleTextSearch}>
                                    Search
                                </Button>
                            </Flex>
                        </Container>
                    </VStack>
                ) : (

                    <>
                        <Container maxW={'xl'}>
                            <Button colorScheme='teal' variant='ghost' onClick={() => { changeSearchMode("text") }}> {"<"} Back</Button>

                            <Flex flexDirection='column' alignItems='center'>
                                <MapBox
                                    //  DEFAULT:: Own Location ??
                                    defaultLat={23.8}
                                    defaultLng={90.4}
                                    onDrag={onDragMarker}
                                    displayType={'block'}
                                    displayMarker={'block'}
                                    isDraggable={true}
                                    onZoom={onZoom}
                                />
                                <Button m={5} colorScheme={"blue"} onClick={handleLocationSearch}> Search </Button>

                            </Flex>
                        </Container>
                    </>
                )
            }
        </>
    );
}



export default Search;

