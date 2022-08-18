import styles from '../styles/PostCard.module.css'
import {Stack, Image, Flex, Avatar, Box, Text, Spacer, Button, Textarea, Center, Checkbox,RadioGroup, Radio} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
} from '@chakra-ui/react'
import {useState, useEffect} from 'react';
import { postData } from '../services/HttpService';
import {getData_Local, storeData_Local} from '../services/StorageService';
import PollCard from './PollCard';
import QuizCard from './QuizCard';



const PostCard = ({post}) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        let inputComment = e.target.value;

        const userID = getData_Local("userId"); 
        setComment(inputComment);

        const commentUrl = '';
        const payload = {
            postID: post._id,
            userID: userID,
            comment: comment
        }

        postData(commentUrl, payload)
        .then((data) => {
            console.log("Response data:", data);
            storeData_Local("token", data.token);
        }).catch((err) => {
            console.log(err);
        });

    }

    const handlePostLikeCount = () => {
        // setPostLike(postLike + 1);

        // const postUrl = '';
        // const payload = {
        //     id: post._id,
        //     likeCount: postLike
        // }

        // postData(postUrl, payload)
        // .then((data) => {
        //     console.log("Response data:", data);
        //     storeData_Local("token", data.token);
        // });
    }

    const handleCommentLikeCount = () => {

    }
    return ( 
        <>
            {post.is_deleted != true &&
                <>
                    <Box className={"bg-dark text-white " + styles.postCard}> 
                        <Flex className={styles.postHeader}>
                            <Avatar src={post.creator.avatar} />
                            <Box ml='3'>
                                <Text fontWeight='bold'>
                                    {post.creator.name}
                                </Text>
                                <Text fontSize='sm'> 
                                    {post.creator.role} &bull; {post.created_at}
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
                                        (media, i) => (
                                            <div key={i}>
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
                                            </div>
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
                            <Box className={styles.buttonContainer} align='left'>
                                {post.like_count > 0 &&
                                    <>
                                        {post.like_count} {post.like_count > 1 ? 'likes' : 'like'}
                                    </>

                                }
                                
                            </Box>
                            <Spacer />
                            <Box className={styles.buttonContainer} align='right'>
                                {post.comments.length > 0 &&
                                    <>
                                        {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
                                    </>

                                }
                            </Box>
                        </Flex>
                        

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
                                        (comment, i) => (
                                            <div key={i}>
                                            {comment.is_deleted != true &&
                                                <>
                                                    <Flex className={styles.getCommentArea}>
                                                        <Avatar src={comment.creator.avatar} />
                                                        <Spacer />
                                                        <Box ml='3'className={styles.textBoxContainer} direction = "column">
                                                                
                                                                <Text className={styles.textNameContainer}>
                                                                    {comment.creator.name}
                                                                </Text>
                                                                <Text className={styles.textContainer}>
                                                                    {comment.content}
                                                                </Text>
                                                        </Box>
                                                        {comment.like_count > 0 &&
                                                            <>
                                                                <Box backgroundColor='gray' width='10%' size='xs' alignSelf='flex-end' borderRadius='20px' align='center'>
                                                                    {comment.like_count}
                                                                </Box>
                                                            </>

                                                        }
                                                        
                                                        
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
                                            </div>
                                            
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