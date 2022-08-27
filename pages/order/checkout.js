import { useRouter } from "next/router";
import {
    useToast,
    Table,
    TableContainer,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Box,
    Stack,
    Heading,
    Center,
    Button,
    Link,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CONFIG from "../../config/config.json";
import { getData, postData } from "../../services/HttpService";
import { getData_Local } from "../../services/StorageService";
import StripeCheckout from 'react-stripe-checkout';


function Checkout() {
    const toast = useToast();
    const router = useRouter();

    const [ticketClass, setTicketClass] = useState("");
    const [ticketPrice, setTicketPrice] = useState(0);

    const [event, setEvent] = useState({});
    const [eventId, setEventId] = useState("");

    const [loaded, setLoaded] = useState(false);
    const [finalLoaded, setFinalLoaded] = useState(false);

    useEffect(() => {

        if (!router.isReady) {
            return;
        }

        const participantId = getData_Local("userId");
        const getOrderUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${participantId}/orders`;

        console.log(router.query);

        // class, price, quantity, eventID
        const { c, p, eid } = router.query;

        if (!loaded) {
            setTicketClass(c);
            setTicketPrice(p);
            setEventId(eid);
            setLoaded(true);
        }

        if (!finalLoaded && loaded) {
            const eventInfoUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/event/${eventId}`;

            getData(eventInfoUrl)
                .then((res) => {
                    console.log("Event Info GET:", res);
                    setEvent(res);
                    setFinalLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        }





    });

    function stripeOnToken(token)
    {
        const ticketQuantity = document.getElementById("ticketCount").value;
        const postOrderUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/order`;

        const payload = {
            tickets: [{
                "class": ticketClass,
                "price": ticketPrice,
                "quantity": ticketQuantity
            }],
            eventId: eventId
        };

        postData(postOrderUrl, payload)
            .then((res) => {

                console.log("Checkout / Order Placement");
                console.table(res);

                if (res.errors) {
                    res.errors.map((err, index) => {
                        toast({
                            title: err.message,
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        });
                    })
                    return;
                }

                //  STRIPE PAYMENT INTEGRATION PART
                ////////////////////////////////////

                const stripeBackendUrl = `${CONFIG.BASE_URL.PAYMENT}/api/payment/participant`;
                const payload = {
                    order_id: res._id || res.id,
                    token: token.id
                }

                postData(stripeBackendUrl, payload)
                    .then((res) => {
                        console.log("Response (PAYMENT):");
                        console.table(res);
                        const message = `Your payment is successful! Your order id: ${res.order_id} and your Stripe Transaction id: ${res.stripe_id}`;
                        //  Confirmation TOAST
                        toast({
                            title: "Payment Success!",
                            description: message,
                            isClosable: true,
                            duration: 4000,
                            status: "success"
                        });

                        new Promise((resolve) => setTimeout(resolve, 4000))
                            .then((res) => {
                                router.reload();
                            })
                    })
                    .catch((err) => {
                        console.error(err);
                        toast({
                            title: "Error in making Payment!",
                            isClosable: true,
                            duration: 4000,
                            status: "error"
                        });
                    });

                ////////////////////////////////////
                ////////////////////////////////////
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: "Error in making Payment!",
                    isClosable: true,
                    duration: 4000,
                    status: "error"
                });
            });

    }


    return (
        finalLoaded ?
            <>
                <Box p={5} mt={5}>
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Heading fontSize={"2xl"} fontWeight={600} fontFamily={"body"}>
                            Checkout
                        </Heading>
                    </Stack>
                    <Heading
                        fontSize={"md"}
                        fontFamily={"monospace"}
                        fontWeight={"normal"}
                        mb={10}
                    >
                    </Heading>
                    <TableContainer>
                        <Table variant='striped' colorScheme="blackAlpha">
                            <Thead>
                                <Tr>
                                    <Th>Info</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Event Name</Td>
                                    <Td><b>{event.name}</b></Td>
                                </Tr>
                                <Tr>
                                    <Td>Ticket Price</Td>
                                    <Td>BDT {ticketPrice}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Quantity</Td>
                                    <Center>
                                        <NumberInput
                                            defaultValue={1}
                                            min={1}
                                            max={5}
                                            width={"50%"}
                                            id="ticketCount"
                                        >
                                            <NumberInputField
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Center>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <StripeCheckout
                                            token={stripeOnToken}
                                            stripeKey={CONFIG.STRIPE_PK}
                                        />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </>
            :
            <></>
    );

}

export default Checkout;