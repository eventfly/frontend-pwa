import styles from '../styles/PostCard.module.css'
import {Container, Image, Flex, Avatar, Box, Text, Spacer, Button, Textarea} from "@chakra-ui/react";

const PostCard = ({post}) => {
    return ( 

        <>
        

            <Box className={"bg-dark text-white " + styles.postCard}> 
                <Flex className={styles.postHeader}>
                    <Avatar src={post.profilePic} />
                    <Box ml='3'>
                        <Text fontWeight='bold'>
                            {post.name}
                        </Text>
                        <Text fontSize='sm'> 
                            {post.role} &bull; {post.date}
                        </Text>
                    </Box>
                </Flex>

                {post.description != '' &&
                    <>
                        <Box className={styles.postDescription}>
                            {post.description}
                        </Box>
                    </>

                }

                {post.image != '' &&
                    <>
                        <Image src={post.image} alt="image" className={styles.postBanner} width='100%'/>
                    </>

                }

                 

                <Flex className={styles.postButtonArea} direction='row' >
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
                {post.comments.length > 0 &&
                    <>
                        {
                            post.comments.map(
                                (comment) => (
                                    <Flex className={styles.getCommentArea}>
                                        <Avatar src={post.profilePic} />
                                        <Spacer />
                                        <Box ml='3'className={styles.textBoxContainer} direction = "column">
                                                
                                                <Text className={styles.textNameContainer}>
                                                    {post.name}
                                                </Text>
                                                <Text className={styles.textContainer}>
                                                    {comment}
                                                </Text>
                                        
                                        </Box>
                                        <Spacer />
                                    </Flex>
                                )
                            )
                        }
                    </>
                }
                <Flex className={styles.postCommentArea} direction='row'>
                    <Avatar src={post.profilePic} />
                    <Spacer />
                    <Box ml='3'className={styles.textAreaContainer} >
                        <Textarea className={styles.postArea} borderRadius='10px' placeholder='Write a comment...' />  
                        
                    </Box>
                    <Spacer />
                    
                </Flex>
                <Flex className={styles.textButtonArea} >
                    <Box className={styles.textButtonContainer} align='center'>
                        <Button colorScheme='teal' variant='ghost' width='100%'>
                            Comment!
                        </Button>
                    </Box>
    
                </Flex>
                
            
            </Box> 

        </>

    );
}
 
export default PostCard;