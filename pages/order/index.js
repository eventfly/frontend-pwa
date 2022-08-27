import { useRouter } from "next/router";
import { useToast, Heading, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CONFIG from "../../config/config.json";
import { getData } from "../../services/HttpService";
import { getData_Local } from "../../services/StorageService";

import OrderCard from "../../components/OrderCard";


function AllOrders()
{
    const router = useRouter();
    const toast = useToast();

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        const participantId = getData_Local("userId");
        const getOrderUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${participantId}/orders`;

        if (!loaded)
        {
            getData(getOrderUrl)
            .then((res) => {
                console.table(res);
                setOrders(res);
                setLoaded(true);
            })
            .catch((err) => {
                console.error(err);
            });
        }

    });

    return (

        loaded ?
        <>
            <Heading>
                <Center>
                    Orders
                </Center>
            </Heading>
            {
                orders.map((order, index) => {
                    return (
                        <OrderCard key={index} order={order} />
                    )
                })
            }
        </>
        :
        <></>

    );

}

export default AllOrders;