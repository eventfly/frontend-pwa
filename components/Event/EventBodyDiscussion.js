import {
    Box,
    Heading,
    Center
} from "@chakra-ui/react";
import PostCard from "../Post/PostCard";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import CreatePost from "./CreatePost";
import { useEffect, useState } from 'react';
import CONFIG from "../../config/config.json";
import { getData } from '../../services/HttpService';


function EventBodyDiscussion(props)
{
    const event = props.event;
    const eventId = event.id || event._id;
    const description = event.description;
    
    const [loaded, setLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {

		if (!loaded)
		{
			const getPostUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/${eventId}/post`;
			getData(getPostUrl)
			.then((res) => {
				console.table(res);
				setPostList(res.event.posts);
				setLoaded(true);
			})
			.catch((err) => {
				console.error(err);
			});
		}

    });

    return (
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
                    <Heading
                        size={"md"}
                    >
                        Discussion
                    </Heading>
                </Center>
                <CreatePost event={event} />
                {
                    loaded ?
                    <>
                        {
                            postList.map((post, index) => {
                                return <PostCard post={post} />
                            })
                        }
                    </>
                    :
                    <></>
                }
            </Box>
        </Box>
    )
}

export default EventBodyDiscussion;