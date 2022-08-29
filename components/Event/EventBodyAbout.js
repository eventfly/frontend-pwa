import {
    Box,
    Heading,
    Container,
    Center,
    Tag,
    TagLabel,
    TagLeftIcon,
    Spacer,
    Button,
    Link
} from "@chakra-ui/react";

import {
    LinkIcon
} from "@chakra-ui/icons";

import {
    FiHash
} from "react-icons/fi";

import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import MapBox from "../Map/MapBox";


function EventBodyAbout(props) {
    const event = props.event;
    const description = event.description;

    return (
        <Box
            mx="auto"
            py={4}
            rounded="lg"
            maxW="2xl"
        >
            <Box
                m={5}
                overflowWrap={"break-word"}
                overflow={"clip"}
            >
                <Container>
                    <Box>
                        {
                            event.zoom_link === "" &&
                            <>
                                <Button
                                    rounded={"md"}
                                    color={'white'}
                                    width={"full"}
                                    colorScheme={"teal"}
                                    _hover={{ bg: 'green.500' }}
                                >
                                    <Link
                                        href={event.zoom_link}
                                    >
                                        <LinkIcon mr={2} />
                                        Join Online
                                    </Link>
                                </Button>
                            </>
                        }
                    </Box>
                </Container>
                <Spacer h={5} />
                <Center>
                    <Heading
                        size={"md"}
                        my={6}
                    >
                        About
                    </Heading>
                </Center>
                <Container>
                    <Box>
                        {
                            event.tags.map((tag, index) => {
                                return (
                                    <Tag size={"sm"} key={index} variant="solid" colorScheme='blue'>
                                        <TagLeftIcon boxSize='12px' as={FiHash} />
                                        <TagLabel
                                            textTransform={"lowercase"}
                                        >
                                            {tag.name}
                                        </TagLabel>
                                    </Tag>
                                )
                            })
                        }
                    </Box>
                    <Spacer h={5} />
                    <ReactMarkdown
                        components={ChakraUIRenderer()}
                        children={description}
                        skipHtml
                    />
                </Container>
                <Center>
                    <Heading
                        size={"md"}
                        my={6}
                    >
                        Event Location
                    </Heading>
                </Center>
                <MapBox
                    //  DEFAULT:: Own Location ??
                    defaultLat={20.5}
                    defaultLng={56.78}
                    displayType={'block'}
                    displayMarker={'block'}
                    isDraggable={false}
                    onZoom={() => { }}
                />

            </Box>
        </Box>
    )
}

export default EventBodyAbout;