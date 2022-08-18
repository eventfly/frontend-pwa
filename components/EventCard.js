import styles from '../styles/EventCard.module.css'
// import Link from 'next/link'
import {Card} from 'react-bootstrap';
import {Image,Link, Flex, Avatar, Box, Text,Stack, Spacer, Button, Textarea} from "@chakra-ui/react";

const EventCard = ({event}) => {
    return ( 
        <>

            {/* <Card className={"bg-dark text-white " + styles.eventCard} >

                <Card.Img src={event.image} alt="Card image" className={styles.eventBanner} /> 

                 <Card.ImgOverlay className={styles.overlay}>
                    <Card.Text className={styles.date}> {event.date} </Card.Text>
                    
                    <Link href={"/event/" + event.url}>
                    <Card.Title className={styles.title}>{event.title}</Card.Title>
                    </Link>
                    
                    
                    <Card.Text className={styles.description}>
                        {event.description}
                    </Card.Text>
                </Card.ImgOverlay>
            </Card> */}

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

        </>

    );
}
 
export default EventCard;