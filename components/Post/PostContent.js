import {
    Flex,
    Box,
    Center
} from "@chakra-ui/react";

import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';


function PostContent(props) {
    const post = props.post;
    const content = post.content;

    return (
        <ReactMarkdown
            components={ChakraUIRenderer()}
            children={content}
            skipHtml
        />
    );
}

export default PostContent;