import {
    Flex,
    Image,
    Heading,
    Link,
    Box,
    Text,
    VStack,
    HStack,
    Tag,
    TagLabel,
    TagRightIcon,
    MdSettings,
    Container,
    Avatar,
    Button,
    chakra,
    Spacer
} from "@chakra-ui/react";
import PostContent from "./Post/PostContent";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useEffect, useState } from "react";
import CONFIG from "../config/config.json";
import { getData } from "../services/HttpService";
import { ChevronRightIcon } from "@chakra-ui/icons";



function FeedPostCard(props) {
    const post = props.post;
    const postCreationDate = new Date(post.created_at).toDateString();
    const postId = post._id;
    const eventId = post.event_id;

    const [feedEventLoaded, setFeedEventLoaded] = useState(false);
    const [event, setEvent] = useState({});

    useEffect(() => {
        if (!feedEventLoaded) {
            const eventInfoUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/event/${eventId}`;
            getData(eventInfoUrl)
                .then((res) => {
                    if (res) {
                        console.log(res);
                        setEvent(res);
                        setFeedEventLoaded(true);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    })

    const postPageUrl = `/event/${eventId}/posts/${postId}`;

    return (
        <Box
            backgroundColor='gray.200'
            color='black'
            borderRadius='10px'
            mx={3}
            my={8}
        >
            <Flex
                pt={4}
                m={2}
            >
                <Box ml='3'>
                    <HStack>
                        <Avatar size={"lg"} src={post.creator.avatar} />
                        <VStack>
                            <Text
                                fontWeight='semibold'
                                fontSize={"md"}
                                mb={-2}
                            >
                                {
                                    post.creator.role === "Participant" ?
                                        <Link
                                            href={`/user/${post.creator.id}`}
                                        >
                                            {post.creator.name}
                                        </Link>
                                        :
                                        <>
                                            {post.creator.name}
                                        </>
                                }
                                {
                                    <>
                                        {
                                            feedEventLoaded ?
                                                <>
                                                    <ChevronRightIcon />
                                                    <Link
                                                        color={"whatsapp.600"}
                                                        fontWeight={"semibold"}
                                                        textDecoration={"underline"}
                                                        href={`/event/${event._id}`}
                                                    >
                                                        {event.name}
                                                    </Link>
                                                </>
                                                :
                                                <></>
                                        }
                                    </>
                                }
                                <br />
                                {
                                    post.creator.role != "Participant" &&
                                    <HStack>
                                        <Tag size={"sm"} variant='outline' colorScheme='blue'>
                                            <TagLabel>{post.creator.role}</TagLabel>
                                        </Tag>
                                    </HStack>
                                }
                                <Link
                                    fontSize={"xs"}
                                    fontWeight={"normal"}
                                    href={postPageUrl}
                                >
                                    {postCreationDate}
                                </Link>
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

                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default FeedPostCard;