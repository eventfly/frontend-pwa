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
    Link
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CONFIG from "../../config/config.json";
import { getData, postData } from "../../services/HttpService";
import { getData_Local } from "../../services/StorageService";
import StripeCheckout from 'react-stripe-checkout';



function SingleOrder()
{
    const router = useRouter();
    const toast = useToast();

    const [order, setOrder] = useState({});
    const [event, setEvent] = useState({});

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [finalLoaded, setFinalLoaded] = useState(false);

    useEffect(() => {

        if (!router.isReady) {
            return;
        }

        const orderId = router.query.order_id;
        const participantId = getData_Local("userId");
        const getOrderUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${participantId}/orders`;

        if (!loaded) {
            getData(getOrderUrl)
                .then((res) => {
                    res.map((order, index) => {
                        if (order._id === orderId) {
                            setOrder(order);
                            setLoaded(true);
                            console.log(order);
                            return;
                        }
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        if (!finalLoaded && loaded) {
            const eventId = order.event_id;
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
        console.log("Token", token);

        const stripeBackendUrl = `${CONFIG.BASE_URL.PAYMENT}/api/payment/participant`;
        const payload = {
            order_id: order._id,
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
    }
    

    return (
        finalLoaded ?
            <>
                <Box p={5} mt={5}>
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Heading fontSize={"2xl"} fontWeight={600} fontFamily={"body"}>
                            Order Info
                        </Heading>
                    </Stack>
                    <Heading
                        fontSize={"md"}
                        fontFamily={"monospace"}
                        fontWeight={"normal"}
                        mb={10}
                    >
                        <Center>
                            ID: {order._id}
                        </Center>
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
                                    <Td>Status</Td>
                                    <Td>{order.status}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Total Price</Td>
                                    <Td>BDT {order.total_price}</Td>
                                </Tr>
                                {
                                    (order.status != "paid") ?
                                        <Tr>
                                            <Td>
                                                <StripeCheckout
                                                    token={stripeOnToken}
                                                    stripeKey={CONFIG.STRIPE_PK}
                                                />
                                            </Td>
                                        </Tr>
                                        :
                                        <></>
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </>
            :
            <></>
    );

}

export default SingleOrder;