import {
    Box,
    Heading,
    Center
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

function EventBodyAbout(props)
{
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
                width={"xs"}
                overflowWrap={"break-word"}
                overflow={"clip"}
            >
                <Center>
                    <Heading
                        size={"md"}
                    >
                        About
                    </Heading>
                </Center>
                <ReactMarkdown
                    components={ChakraUIRenderer()}
                    children={ description }
                    skipHtml
                />
            </Box>
        </Box>
    )
}

export default EventBodyAbout;