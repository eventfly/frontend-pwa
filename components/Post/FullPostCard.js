import {
    Flex,
    Image,
    Heading,
    Link,
    Box,
    Text,
    VStack,
    HStack,
    Container,
    Avatar,
    Button,
    Spacer
} from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import PostContent from "./PostContent";
import {getData_Local, storeData_Local} from '../../services/StorageService';
import { putData } from '../../services/HttpService';
import CONFIG from "../../config/config.json";


function FullPostCard(props)
{
    const post = props.post;
    const postContent = post.content;
    const postCreationDate = new Date(post.created_at).toDateString();
    const posterId = post.creator.id;
    const postId = post._id;
    const eventId = post.event_id;
    var likeToggle = false;

    useEffect(() => {
        

    });
    const handlePostLikeCount = () => {

        const buttonElem = document.getElementById("likeButton");
        const buttonValue = buttonElem.value;

        if (buttonValue === "not-liked") {
            buttonElem.value = "liked";
            buttonElem.textContent = "Liked";
        }
        else if (buttonValue === "liked") {
            buttonElem.value = "not-liked";
            buttonElem.textContent = "Like";
        }
        
        likeToggle = (buttonElem.value === "liked");
        console.log("likeToggle: ", likeToggle);

        const userID = getData_Local("userId"); 
        const likeUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/edit-like`;
        const payload = {
            post_id: post._id,
        }

        console.log("payload: ", payload)

        putData(likeUrl, payload)
        .then((data) => {
            console.log("Response data:", data);
        }).catch((err) => {
            console.log("error");
        });
    }

    return (
        <Box backgroundColor='gray.200' color='black' borderRadius='10px'>
            <Flex
                pt={4}
                m={2}
            >
                <Box ml='3'>
                    <HStack>
                        <Avatar src={props.post.creator.avatar} />
                        <VStack>
                            <Text
                                fontWeight='bold'
                                fontSize={"lg"}
                                mb={-2}
                            >
                                {post.creator.name}
                            </Text>
                            <Text
                            >
                                {postCreationDate}
                            </Text>
                        </VStack>
                    </HStack>
                    <Flex
                        w="full"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            mx="auto"
                            py={4}
                            rounded="lg"
                            maxW="2xl"
                        >
                            <Box
                                my={5}
                                width={"xs"}
                                overflowWrap={"break-word"}
                                overflow={"clip"}
                            >
                                <PostContent post={post} />
                            </Box>
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
                            <HStack>
                                    <Button
                                        width={"50%"}
                                        colorScheme={"facebook"}
                                        id="likeButton" value="not-liked"
                                        onClick={() => handlePostLikeCount()}
                                    >
                                        Like
                                    </Button>
                                    <Button
                                        width={"50%"}
                                        colorScheme={"blackAlpha"}
                                    >
                                        Comment
                                    </Button>
                            </HStack>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default FullPostCard;