import { Image, Link, Flex, Avatar, Box, Text, Stack, Spacer, Button, VStack, Container, chakra } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import CONFIG from "../../config/config.json";
import { getData } from "../../services/HttpService";


function EventCard(props)
{
    const [ organizerName, setOrganizerName ] = useState("");
    const [ loaded, setLoaded ] = useState(false);

    const event = props.event;

    const eventId = event._id || event.id;
    const eventTitle = event.name;
    const eventPrivacy = event.privacy;
    const eventBanner = event.banner_url;    
    const eventType = event.type;
    const eventOrgId = event.organizer;
    const eventStartDate = new Date(event.start_date).toDateString();
    console.log(eventStartDate);

    const eventDescription = `${event.description.substring(0, 250)} ...`;
    const eventUrl = `/event/${eventId}`;

    //  TODO Organzier Info GET
    useEffect(() => {

        if (!loaded)
        {
            const organizerUrl = `${CONFIG.BASE_URL.ORG}/api/org/${eventOrgId}/profile`;
            getData(organizerUrl)
            .then((res) => {
                console.table(res);
                setOrganizerName(res.org.name);
                setLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    });

    console.log(eventDescription);
    console.log("EventCard:");
    console.table(event);

    return (
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
                    src={eventBanner}
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
                            {`${eventPrivacy} • ${eventType}`}
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
                            { eventTitle }
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
                                    by { organizerName }
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
                                { eventStartDate }
                            </chakra.span>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}

export default EventCard;