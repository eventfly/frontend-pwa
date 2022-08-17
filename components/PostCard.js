import styles from '../styles/PostCard.module.css'
import {Stack, Image, Flex, Avatar, Box, Text, Spacer, Button, Textarea, Center, Checkbox,RadioGroup, Radio} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'
import PollCard from './PollCard';
import QuizCard from './QuizCard';


const PostCard = ({post, handleCommentChange, handleCommentLikeCount, handlePostLikeCount}) => {
    return ( 
        <>
            {post.is_deleted != true &&
                <>
                    <Box className={"bg-dark text-white " + styles.postCard}> 
                        <Flex className={styles.postHeader}>
                            <Avatar src={post.creator.creator_avatar} />
                            <Box ml='3'>
                                <Text fontWeight='bold'>
                                    {post.creator.creator_name}
                                </Text>
                                <Text fontSize='sm'> 
                                    {post.creator.creator_role} &bull; {post.created_at}
                                </Text>
                            </Box>
                        </Flex>

                        {post.content != '' &&
                            <>
                                <Box className={styles.postDescription}>
                                    <Text fontSize='lg'> 
                                        {post.content}
                                    </Text>
                                </Box>
                            </>

                        }

                        {post.medias.length > 0 &&
                            <>
                                {   
                                    post.medias.map(
                                        (media) => (
                                            <>
                                                <Image src={media.url} alt="image" className={styles.postBanner} width='100%'/>
                                                <Spacer/>
                                                {media.caption != '' &&
                                                    <>
                                                        <Box padding='1%' backgroundColor='#464644' borderRadius="10px">
                                                            <Text fontSize='md'> 
                                                                {media.caption}
                                                            </Text>
                                                        </Box>
                                                    </>
                                                }
                                            </>
                                        )
                                    )

                                }
                                
                            </>

                        }
                        {post.poll_options.length > 0 &&
                            <>
                                <PollCard post={post}/>                                    
                            </>
                        }

                        {post.questions.length > 0 &&
                            <>
                                <QuizCard post={post}/>
                            </>

                        }
                        
                        

                        <Flex className={styles.postButtonArea} direction='row' >
                            <Box className={styles.buttonContainer} align='center'>
                                <Button colorScheme='teal' variant='ghost' width='100%' onClick={() => handlePostLikeCount()}>
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
                                            <>
                                            {comment.is_deleted != true &&
                                                <>
                                                    <Flex className={styles.getCommentArea}>
                                                        <Avatar src={comment.creator.creator_avatar} />
                                                        <Spacer />
                                                        <Box ml='3'className={styles.textBoxContainer} direction = "column">
                                                                
                                                                <Text className={styles.textNameContainer}>
                                                                    {comment.creator.creator_name}
                                                                </Text>
                                                                <Text className={styles.textContainer}>
                                                                    {comment.content}
                                                                </Text>
                                                        </Box>
                                                        
                                                        <Spacer />
                                                        <Center>
                                                            <Popover>
                                                            <PopoverTrigger>
                                                                <Button colorScheme='teal' variant='ghost' width='25%' size='xs' alignContent='center'>
                                                                    ...
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent backgroundColor='#292928'>
                                                                <PopoverArrow />
                                                                <Stack direction='column'>
                                                                <Button colorScheme='teal' variant='ghost' width='100%' size='sm'>
                                                                    Edit
                                                                </Button>
                                                                <Button colorScheme='teal' variant='ghost' width='100%' size='sm'>
                                                                    Delete
                                                                </Button>
                                                                </Stack>
                                                            </PopoverContent>
                                                            </Popover>    
                                                        </Center>
                                                            
                                                    </Flex>
                                                    <Flex justifyContent='flex-end'>
                                                        <Stack direction='row'>
                                                            <Button colorScheme='teal' variant='link' width='25%' size='xs' onClick={() => handleCommentLikeCount()}>
                                                                Like
                                                            </Button>
                                                            <Button colorScheme='teal' variant='link' width='25%' size='xs'>
                                                                Reply
                                                            </Button>
                                                            <Center>
                                                                <Text fontSize='xs' >
                                                                    Time
                                                                </Text>
                                                            </Center>
                                                            
                                                        </Stack>
                                                    </Flex>
                                                </>
                                            }
                                            </>
                                            
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
                                <Button colorScheme='teal' variant='ghost' width='100%' onClick={(e) => handleCommentChange(e)}>
                                    Comment!
                                </Button>
                            </Box>
            
                        </Flex>
                        
                    
                    </Box>
                </>

            }
        
        </>
        

    );
}
 
export default PostCard;