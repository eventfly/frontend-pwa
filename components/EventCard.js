import {Image,Link, Flex, Avatar, Box, Text,Stack, Spacer, Button, Textarea, chakra} from "@chakra-ui/react";
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
            <>
            <Flex
              bg="#edf3f8"
              _dark={{ bg: "#3e3e3e" }}
              p={50}
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                mx="auto"
                rounded="lg"
                shadow="md"
                bg="white"
                _dark={{ bg: "gray.800" }}
                maxW="2xl"
              >
                <Image
                  roundedTop="lg"
                  w="full"
                  h={64}
                  fit="cover"
                  src={props.event.image}
                  alt="Article"
                />
        
                <Box p={6}>
                  <Box>
                    <chakra.span
                      fontSize="xs"
                      textTransform="uppercase"
                      color="brand.600"
                      _dark={{ color: "brand.400" }}
                    >
                      {props.event.date}
                    </chakra.span>
                    <Link
                      display="block"
                      color="gray.800"
                      _dark={{ color: "white" }}
                      fontWeight="bold"
                      href={"/event/" + props.event.url}
                      fontSize="2xl"
                      mt={2}
                      _hover={{ color: "gray.600", textDecor: "underline" }}
                    >
                      {props.event.title}
                    </Link>
                    <chakra.p
                      mt={2}
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      {props.event.description}
                    </chakra.p>
                  </Box>
                </Box>
                </Box>
        
            </Flex>
            {/* <Box className={"bg-dark text-white " + styles.eventCard} backgroundImage={event.image}>
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
            </Box> */}
            </>
       :
           <></>
    );
}
 
export default EventCard;