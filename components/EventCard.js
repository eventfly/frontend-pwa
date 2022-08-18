import styles from '../styles/EventCard.module.css'
// import Link from 'next/link'
import {Card} from 'react-bootstrap';
import {Image,Link, Flex, Avatar, Box, Text,Stack, Spacer, Button, Textarea} from "@chakra-ui/react";
import { useEffect, useState } from 'react';

const EventCard = (props) => {

    const [ event, setEvent ] = useState(null);
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        if (!loaded)
        {
            setEvent(props.event);
            setLoaded(true);
            return;
        }
    });

    return (
        loaded ?
            <Box className={"bg-dark text-white " + styles.eventCard} backgroundImage={event.image}>
                <Flex className={styles.overlay}>
                        <Text>
                            {event.date}
                        </Text>
                        <Link className={styles.title} color='white' href={"/event/" + event.url} fontSize="xx-large" fontWeight='bold'>
                            {event.title}
                        </Link>
                        <Text fontSize="large">
                            {event.description}
                        </Text>
                </Flex>
            </Box>
        :
            <></>
    );
}
 
export default EventCard;