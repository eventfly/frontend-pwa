import styles from '../styles/PostCard.module.css'
import Link from 'next/link'
import {Card} from 'react-bootstrap';
import {Flex, Avatar, Box, Text, Spacer, Button} from "@chakra-ui/react";

const PostCard = ({post}) => {
    return ( 

        <>

             <Card className={"bg-dark text-white " + styles.postCard}> 
                <Flex className={styles.postHeader}>
                    <Avatar src={post.image} />
                    <Box ml='3'>
                        <Text fontWeight='bold'>
                        {post.name}
                       
                        </Text>
                        <Text fontSize='sm'> {post.role}</Text>
                    </Box>
                </Flex>

                <Box className={styles.postDescription}>
                    {post.description}
                </Box>

                <Card.Img src={post.image} alt="Card image" className={styles.postBanner} /> 

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