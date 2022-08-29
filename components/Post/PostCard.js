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
    chakra
} from "@chakra-ui/react";
import PostContent from "./PostContent";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';


function PostCard(props) {
    const post = props.post;
    const postContent = post.content;
    const postCreationDate = new Date(post.created_at).toDateString();
    const posterId = post.creator.id;
    const postId = post._id;
    const eventId = post.event_id;

    const postPageUrl = `/event/${eventId}/posts/${postId}`;

    return (
        <Box backgroundColor='gray.200' color='black' borderRadius='10px'>
            <Flex
                pt={4}
                m={2}
            >
                <Box ml='3'>
                    <HStack>
                        <Avatar size={"lg"} src={post.creator.avatar} />
                        <VStack>
                            <Text
                                fontWeight='bold'
                                fontSize={"lg"}
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
                                <br />
                                {
                                    post.creator.role != "Participant" &&
                                    <HStack>
                                        <Tag size={"sm"} mb={1} variant='outline' colorScheme='blue'>
                                            <TagLabel>{post.creator.role}</TagLabel>
                                        </Tag>
                                    </HStack>
                                }
                            </Text>
                            <Link
                                fontSize={"sm"}
                                href={postPageUrl}
                            >
                                {postCreationDate}
                            </Link>
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

export default PostCard;