import {
    Box,
    Flex,
    chakra
} from "@chakra-ui/react";

import QR from "./QR";

function TicketCard(props)
{
    const ticket = props.ticket;

    const ticketID = ticket.id;
    const ticketPrice = ticket.price;
    const purchaseTime = new Date(ticket.created_at).toDateString();
    const ticketClass = ticket.class;
    const eventName = ticket.event.name;
    const ticketHolderName = ticket.participant.name;

    return (
        <Flex
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
            >
            <Box
                maxW="xs"
                mx="auto"
                bg="white"
                _dark={{
                bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
            >
                <Box px={4} py={2}>
                    <chakra.h1
                        color="gray.800"
                        _dark={{
                        color: "white",
                        }}
                        fontWeight="bold"
                        fontSize="lg"
                    >
                        { eventName }
                    </chakra.h1>
                    <chakra.p
                        mt={1}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{
                        color: "gray.400",
                        }}
                    >
                        <b>Purchased: </b>{ purchaseTime } <br/>
                        <b>Ticket Class: </b>{ ticketClass } <br/>
                        <b>Bought By: </b>{ ticketHolderName }
                    </chakra.p>
                </Box>
            
                <Box px={6} py={6}>
                    <QR ticketID={ticketID} />
                </Box>

                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    px={4}
                    py={2}
                    bg="gray.900"
                    roundedBottom="lg"
                >
                    <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                        BDT { ticketPrice }
                    </chakra.h1>
                </Flex>
            </Box>
        </Flex>
    );
}

export default TicketCard;