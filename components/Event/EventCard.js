import { Image, Link, Flex, Avatar, Box, Text, Stack, Spacer, Button, VStack, Container, chakra } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import CONFIG from "../../config/config.json";
import { getData } from "../../services/HttpService";


function EventCard(props)
{
    const [ finalLoaded, setFinalLoaded ] = useState(false);
    const [ loaded, setLoaded ] = useState(false);
    
    const [ eventDescription, setEventDescription ] = useState("");
    const [ eventDate, setEventDate ] = useState("");

    const [ organizer, setOrganizer ] = useState({});
    const [ event, setEvent ] = useState({});

    const eventId = props.eventId;
    const eventUrl = `/event/${eventId}`;

    //  TODO Organzier Info GET
    useEffect(() => {

        if (!loaded) {
            const getEventUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/event/${eventId}`;
            console.log(getEventUrl);

            getData(getEventUrl)
            .then((res) => {
                console.log("In EventCard : first Fetch");
                console.table(res);
                setEvent(res);
                setEventDescription(res.description.substr(0, 200));
                setEventDate(new Date(res.start_date).toDateString());
                setLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            })
        }

        if (!finalLoaded && loaded)
        {
            const getOrganizerUrl = `${CONFIG.BASE_URL.ORG}/api/org/${event.organizer}/profile`;
            getData(getOrganizerUrl)
            .then((res) => {
                console.log("In EventCard : second fetch");
                console.table(res);
                setOrganizer(res.org);
                setFinalLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    });

    return (
        finalLoaded ?
        <Flex
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={5}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                mx="auto"
                rounded="lg"
                shadow="md"
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                maxW="xl"
            >
                <Image
                    roundedTop="lg"
                    w="full"
                    h={64}
                    fit="cover"
                    src={event.banner_url}
                    alt="Article"
                />

                <Box p={6}>
                    <Box>
                        <chakra.span
                            fontSize="xs"
                            textTransform="uppercase"
                            color="brand.600"
                            _dark={{
                                color: "brand.400",
                            }}
                        >
                            {`${event.privacy} • ${event.type}`}
                        </chakra.span>
                        <Link
                            display="block"
                            color="gray.800"
                            _dark={{
                                color: "white",
                            }}
                            href={eventUrl}
                            fontWeight="bold"
                            fontSize="2xl"
                            mt={2}
                            _hover={{
                                color: "gray.600",
                                textDecor: "underline",
                            }}
                        >
                            { event.name }
                        </Link>
                        <chakra.p
                            mt={2}
                            fontSize="sm"
                            color="gray.600"
                            _dark={{
                                color: "gray.400",
                            }}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                        >
                            { eventDescription }
                        </chakra.p>
                    </Box>

                    <Box mt={4}>
                        <Flex alignItems="center">
                            <Flex alignItems="center">
                                <Link
                                    fontWeight="bold"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.200",
                                    }}
                                >
                                    by { organizer.name }
                                </Link>
                            </Flex>
                            <chakra.span
                                mx={1}
                                ml={"auto"}
                                fontSize="md"
                                color="gray.600"
                                _dark={{
                                    color: "gray.300",
                                }}
                            >
                                { eventDate }
                            </chakra.span>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Flex>
        :
        <></>
    );
}

export default EventCard;