import styles from '../styles/PostCard.module.css'
import Link from 'next/link'
import {Card} from 'react-bootstrap';
import {Flex, Avatar, Box, Text, Spacer, Button} from "@chakra-ui/react";

const PostCard = ({event}) => {
    return ( 

        <>

             <Card className={"bg-dark text-white " + styles.postCard}> 
                <Flex>
                    <Avatar src={event.image} />
                    <Box ml='3'>
                        <Text fontWeight='bold'>
                        Segun Adebayo
                       
                        </Text>
                        <Text fontSize='sm'>UI Engineer</Text>
                    </Box>
                </Flex>

                <Box>
                    Lorem ipsum post Lorem ipsum post Lorem ipsum post
                </Box>

                <Card.Img src={event.image} alt="Card image" className={styles.postBanner} /> 

                <Flex direction='row' >
                    <Box className={styles.buttonContainer} align='center'>
                        <Button colorScheme='teal' variant='ghost' width='100%'>
                            Like
                        </Button>
                    </Box>
                    <Spacer />
                    <Box className={styles.buttonContainer} align='center'>
                        <Button colorScheme='teal' variant='ghost' width='100%'>
                            Comment
                        </Button>
                    </Box>
                </Flex>
            
             </Card> 

        </>

    );
}
 
export default PostCard;