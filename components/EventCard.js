import styles from "../styles/EventCard.module.css";
import {Stack, Checkbox, Avatar, Box, Text, Spacer, Button, Link} from "@chakra-ui/react";

const EventCard = ({ event }) => {
    return (
        <Box className={"bg-dark text-white " + styles.eventCard} backgroundImage={event.image}>

            <Stack direction='column'>
                <Spacer/>
                <Spacer/>
                <Spacer/>
                <Text fontSize='sm'>
                    {event.date}
                </Text>
                <Link href={"/event/" + event.url} fontSize='xx-large'>
                    {event.title}
                </Link>
                <Text >
                    {event.description}
                </Text>

            </Stack>
            
        
            
        </Box>
    );
};

export default EventCard;
