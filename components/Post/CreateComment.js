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
    chakra, 
    Spacer,
    Textarea
} from "@chakra-ui/react";
import {getData_Local, storeData_Local} from '../../services/StorageService';
import { postData } from '../../services/HttpService';
import { useState, useEffect } from 'react'
import CONFIG from "../../config/config.json";

function CreateComment(props)
{
    const post = props.post;
    const postId = post._id;
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        const textElem = document.getElementById("textArea");
        const inputComment = textElem.value;
        
        console.log("comment: ", inputComment)

        const userID = getData_Local("userId"); 
        setComment(inputComment);

        const commentUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/post/${postId}/comment`;
        const payload = {
            content: inputComment
        }

        postData(commentUrl, payload)
        .then((data) => {
            console.log("Response data:", data);
            console.log("comment sent")
        }).catch((err) => {
            console.log("error in comment sent");
        });

    }

    return (
        <>
                <Flex padding='1%' direction='row'>
                    <Box ml='3'width='100%' backgroundColor='white' borderRadius='10px'>
                        <Textarea id='textArea' padding='1%' borderRadius='10px' placeholder='Write a comment...' />  
                        
                    </Box>
                    <Spacer />
                    
                </Flex>
                <Flex width='100%' paddingRight='1%' paddingLeft='1%' paddingBottom='1%' justifyContent='flex-end' >
                    <Box width='25%' align='center'>
                        <Button colorScheme="blackAlpha" fontSize='small' width='100%' onClick={(e) => handleCommentChange(e)}>
                            Comment
                        </Button>
                    </Box>
    
                </Flex>
        </>   
    )
}


export default CreateComment;