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
    Stack,
    Center
} from "@chakra-ui/react";
import {getData_Local, storeData_Local} from '../../services/StorageService';
import { getData } from '../../services/HttpService';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CONFIG from "../../config/config.json";
import SingleCommentView from "./SingleCommentView";

function ShowComment(props)
{
    const post = props.post;
    const postId = post._id;
    const router = useRouter();
    const [ loaded, setLoaded ] = useState(false);
    const [comments, setComments] = useState('');


    useEffect(() => {

 			const commentInfoUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/post/${postId}/comment`;
			console.log("Above loaded");
			if (!loaded)
			{   
                console.log('not loaded')
				getData(commentInfoUrl)
				.then((res) => {
					console.log("post Info GET:", res.post);
                    console.log("comment Info GET:", res.post.comments);
					setComments(res.post.comments);
					setLoaded(true);
                    console.log('comments: ',comments);
				})
				.catch((err) => {
					console.error(err);
				})
                
			}
		
	});


    return (
        loaded ?
			<>  
                {comments.length > 0  &&
                    <>
                        {
                            comments.map(
                                (comment, i) => (
                                    
                                    <>
                                        <SingleCommentView comment={comment} />
                                        
                                    </>
                                    
                                )
                            )
                        }
                    </>
                }
            
            </>
		:
			<>
			</>
                
     
    )
}


export default ShowComment;