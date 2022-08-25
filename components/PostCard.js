import {Stack, Image, Flex, Avatar, Box, Text, Spacer,VStack, Container, Button, Textarea, Center, Checkbox,RadioGroup, Radio} from "@chakra-ui/react";
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
    const [showComment, setShowComment] = useState(false);

    const handleShowComment = () => {
        console.log(showComment)
        if(showComment == false)
            setShowComment(true)
        else if(showComment == true)
            setShowComment(false)
    }

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
            <VStack>
                <Container maxW='2xl' padding='40px' borderRadius='10px' >      
                    {post.is_deleted != true &&
                        <>
                            <Box backgroundColor='gray.100' color='black' borderRadius='10px'> 
                                <Flex padding='1%'>
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
                                        <Box padding='1%'>
                                            <Text fontSize='lg' textAlign='justify' padding='1%'> 
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
                                                    <>
                                                        <Image src={media.url} alt="image" height='300px' objectFit='cover' width='100%'/>
                                                        <Spacer/>
                                                        {media.caption != '' &&
                                                            <>
                                                                <Box padding='1%' backgroundColor='gray.200' borderRadius="10px" color='black'>
                                                                    <Text fontSize='md' textAlign='justify' padding='1%'> 
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

                                <Flex paddingLeft='1%' paddingRight='1%' paddingTop='1%' direction='row' >
                                    <Box width='50%' align='left'>
                                        {post.like_count > 0 &&
                                            <>
                                                {post.like_count} {post.like_count > 1 ? 'likes' : 'like'}
                                            </>

                                        }
                                        
                                    </Box>
                                    <Spacer />
                                    <Box width='50%' align='right' >
                                        {post.comments.length > 0 &&
                                            <>
                                                {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
                                            </>

                                        }
                                    </Box>
                                </Flex>
                                

                                <Flex paddingLeft='1%' paddingRight='1%' paddingTop='1%' direction='row' >
                                    <Box width='50%' align='center'>
                                        <Button colorScheme='teal' variant='ghost' width='100%' onClick={() => handlePostLikeCount()}>
                                            Like
                                        </Button>
                                    </Box>
                                    <Spacer />
                                    <Box width='50%'align='center'>
                                        <Button colorScheme='teal' variant='ghost' width='100%' onClick={() => handleShowComment()}>
                                            Comment
                                        </Button>
                                    </Box>
                                </Flex>
                                {post.comments.length > 0 && showComment === true &&
                                    <>
                                        {
                                            post.comments.map(
                                                (comment, i) => (
                                                    <>
                                                    {comment.is_deleted != true &&
                                                        <>
                                                            <Flex padding='1%'>
                                                                <Avatar src={comment.creator.avatar} />
                                                                <Spacer />
                                                                <Box ml='3' width='100%' backgroundColor='white' borderRadius='10px' overflow='hidden' direction = "column">
                                                                        
                                                                        <Text width='100%' paddingLeft='1.5%' paddingBottom='1.5%' fontWeight='bold'>
                                                                            {comment.creator.name}
                                                                        </Text>
                                                                        <Text width='100%' height='auto' maxHeight='150px' padding='3%' textAlign='justify'
                                                                            sx={
                                                                                { 
                                                                                '::-webkit-scrollbar':{
                                                                                    display:'none'
                                                                                }
                                                                                }
                                                                            } 
                                                                            overflow='hidden' overflowY='scroll'
                                                                        >
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
                                                    </>
                                                    
                                                )
                                            )
                                        }
                                    </>
                                }
                                <Flex padding='1%' direction='row'>
                                    <Avatar src={post.profilePic} />
                                    <Spacer />
                                    <Box ml='3'width='100%' backgroundColor='white' borderRadius='10px'>
                                        <Textarea padding='1%' borderRadius='10px' placeholder='Write a comment...' />  
                                        
                                    </Box>
                                    <Spacer />
                                    
                                </Flex>
                                <Flex width='100%' paddingRight='1%' paddingLeft='1%' paddingBottom='1%' justifyContent='flex-end' >
                                    <Box width='25%' align='center'>
                                        <Button colorScheme='teal' variant='ghost' width='100%' onClick={(e) => handleCommentChange(e)}>
                                            Comment
                                        </Button>
                                    </Box>
                    
                                </Flex>
                                
                            
                            </Box>
                        </>

                    }
                </Container>
            </VStack>
        </>
        

    );
}
 
export default PostCard;