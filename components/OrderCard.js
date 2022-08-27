import {
    Flex,
    Box,
    VStack,
    HStack,
    Link,
    Text,
    Heading,
    Badge,
    Image,
    Center
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import CONFIG from "../config/config.json";
import { getData } from "../services/HttpService";




function OrderCard(props) {
    const order = props.order;

    const eventId = order.event_id;
    const orderUrl = `/order/${order._id}`;
    const [event, setEvent] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        const eventInfoUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/event/${eventId}`;

        if (!loaded) {
            getData(eventInfoUrl)
                .then((res) => {
                    console.log("Event Info GET:", res);
                    setEvent(res);
                    setLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    });


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
            <Link
                href={orderUrl}
            >
                <Box
                    bg="white"
                    _dark={{
                        bg: "gray.800",
                    }}
                    maxW="sm"
                    borderWidth="1px"
                    rounded="lg"
                    shadow="lg"
                >
                    <Box p="6">
                        <Box display="flex" alignItems="baseline">
                            <Badge rounded="full" px="2" colorScheme="teal">
                                ORDER ID
                            </Badge>
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                ml="2"
                            >
                                {order._id}
                            </Box>
                        </Box>

                        <Text
                            mt="1"
                            fontWeight="semibold"
                            as="h2"
                            fontSize={"xl"}
                            noOfLines={1}
                        >
                            {event.name}
                        </Text>

                        <Box>
                            BDT {order.total_price}
                        </Box>

                        <Box display="flex" mt="2" alignItems="center">
                            <Box as="span" color="gray.600" textTransform={"uppercase"} fontSize="sm">
                                {order.status}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Link>

        </Flex>
    );
};

export default OrderCard;