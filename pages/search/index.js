import { useEffect, useState } from 'react';

import { Stack, Image, Flex, Avatar, Box, Text, Spacer, Button, Textarea, Center, Input, Container, VStack } from "@chakra-ui/react";
import { postData } from '../../services/HttpService';
import { getData_Local, storeData_Local } from '../../services/StorageService';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
} from '@chakra-ui/react'

import MapBox from '../../components/Map/MapBox'
import meterPerPixel from '../../components/Map/PixelToMeter';
import { useRouter } from 'next/router';
import CONFIG from "../../config/config.json";
import EventCard from '../../components/Event/EventCard';


const BASE_LAT = 23.8;
const BASE_LONG = 90.4;

function Search() {
    const router = useRouter();
    const radiusInPixel = 100;

    const [searchText, setSearchText] = useState('');
    const [locationSearch, setLocationSearch] = useState({
        lat: BASE_LAT,
        long: BASE_LONG,
        zoom: 10
    });

    const [searchMode, setSearchMode] = useState('text');
    const [gpsLocked, setGpsLocked] = useState(false);
    const [eventsAreLoaded, setEventsAreLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {

        if (!gpsLocked) {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition((data) => {
                console.log("Permission given");
                console.table(data.coords);
                const newLoc = {
                    lat: data.coords.latitude,
                    long: data.coords.longitude,
                    zoom: Math.round(locationSearch.zoom)
                };
                setLocationSearch(newLoc);
                setGpsLocked(true);
            },
                (err) => {
                    console.error(err);
                },
                options);
        }
    });


    function handleTextSearch() {
        if (!router.isReady) {
            return;
        }
        router.push(`/search/${searchText}`);
    }

    const handleLocationSearch = () => {
        const zoomLevel = locationSearch.zoom;
        let radiusKM = meterPerPixel[zoomLevel] * radiusInPixel / 1000.0;

        const earthRadius = 6371;
        const earthCircumference = 2 * Math.PI * earthRadius;
        console.log("circumference: " + earthCircumference);

        const latDiff = 360 * radiusKM / earthCircumference;
        const longDiff = 360 * radiusKM / earthCircumference / Math.cos(locationSearch.lat * Math.PI / 180);


        const locationSearchUrl = `${CONFIG.BASE_URL.ANALYTICS}/api/analytics/search/location`;
        const participantId = getData_Local("userId");
        const payload = {
            participantId: participantId,
            participantLng: locationSearch.long,
            participantLat: locationSearch.lat
        };

        postData(locationSearchUrl, payload)
            .then((res) => {
                console.table(res);
                setSearchResults(res.events);
                setEventsAreLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const onDragMarker = (lat, lng) => {
        let newLoc = {
            lat: lat,
            long: lng,
            zoom: Math.round(locationSearch.zoom)
        };
        setLocationSearch(newLoc);
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
                                                <Input type='text' id='search' variant='outlined' placeholder='Enter Keywords to Search ...' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverBody p={2}>
                                                    <VStack py={2} display='flex' flexDirection='column' alignItems='center'>
                                                        <Button rounded={'md'} w={"full"} colorScheme='blue' onClick={() => { changeSearchMode("location") }}>Search By Location Instead</Button>
                                                        <Button rounded={'md'} w={"full"} variant='ghost' onClick={onClose}>Cancel</Button>
                                                    </VStack>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </>
                                    )}
                                </Popover>
                            </Flex>

                            <Spacer py={2} />
                            <Button w={"full"} colorScheme='teal' variant='solid' onClick={handleTextSearch}>
                                Search
                            </Button>

                        </Container>
                    </VStack>
                ) : (
                    <>
                        <Container maxW={'xl'}>
                            <Button colorScheme='teal' variant='ghost' onClick={() => { changeSearchMode("text") }}> {"<"} Back</Button>

                            <Flex flexDirection='column' alignItems='center'>
                                <MapBox
                                    //  DEFAULT:: Own Location ??
                                    defaultLat={locationSearch.lat}
                                    defaultLng={locationSearch.long}
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
            <>
                {
                    eventsAreLoaded &&
                    searchResults.map((eventId, index) => {
                        return <EventCard key={index} eventId={eventId} />
                    })
                }

            </>
        </>
    );
}

export default Search;