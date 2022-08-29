import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import CONFIG from "../../../../config/config.json";
import { getData } from '../../../../services/HttpService'

import FullPostCard from '../../../../components/Post/FullPostCard';
import {
    Box,
    Heading,
    Center,
    Flex,
    Stack
} from "@chakra-ui/react";
import CreateComment from '../../../../components/Post/CreateComment';
import ShowComment from '../../../../components/Post/ShowComment';

function SinglePostDetails()
{
	
    const router = useRouter();

	const [ loaded, setLoaded ] = useState(false);

    const [ post, setPost ] = useState(null);
    const [ postId, setPostId ] = useState("");




	useEffect(() => {

		if (!router.isReady)
		{
			return;
		}
		else 
		{
			const { post_id } = router.query;
			setPostId(post_id);
 			const postInfoUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/post/${post_id}`;
			 console.log("useEffect of Postid.js----------");
			if (!loaded)
			{   
                console.log('not loaded')
				getData(postInfoUrl)
				.then((res) => {
					console.log("Post Info GET:", res);
					setPost(res.post);
					setLoaded(true);
                    console.log('post: ',post);
				})
				.catch((err) => {
					console.error(err);
				})	
			}
		}
	});
	
	return (
		 loaded ?
			<>
            <Box
                mx="auto"
                py={4}
                rounded="lg"
                maxW="3xl"
            >
                <Box
                    m={5}
                    overflowWrap={"break-word"}
                    overflow={"clip"}
                >
                    <Center>
                        <Stack>
                            <FullPostCard post={post}/>
                            <ShowComment post={post}/>
                            <CreateComment post={post}/>
                        </Stack>
                        
                    </Center>
                    
                </Box>
            </Box>
				 
			</>
		:
			<>
			</>
	);
}

export default SinglePostDetails;