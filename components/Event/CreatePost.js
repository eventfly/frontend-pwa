import {
    Heading,
    HStack,
    Box,
    Spacer,
    Flex,
    Textarea,
    Button,
    useToast
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useState, useEffect } from "react";
import CONFIG from "../../config/config.json";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { postData } from "../../services/HttpService";


function CreatePost(props)
{
    const event = props.event;
    const eventId = event.id || event._id;

    const toast = useToast();
    const [ content, setContent ] = useState("");

    useEffect(() => {
    }, []);

    function updateContent(e)
    {
        const srcContentElem = document.getElementById("srcContent");
        const srcContent = srcContentElem.value;
        setContent(srcContent);
    }

    function openFilePicker(e) {
        const imageFileElem = document.getElementById("postImage");
        imageFileElem.click();
    }

    function uploadImage(e)
    {
        const imageFile = e.target.files[0];
        const fileNameParts = imageFile.name.split(".");
        const fileExtension = fileNameParts[fileNameParts.length - 1];

        const randomUUID = crypto.randomUUID();
        const imageFileName = `${randomUUID}.${fileExtension}`;
        console.log(imageFileName);

        //  Uploading to firebase
        //  baseRef is the default bucket reference
        //  storageRef is the folder reference for 'posts'
        const storage = getStorage();
        const baseRef = ref(storage, imageFileName);
        const storageRef = ref(baseRef, "posts");
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on("state_changed",
            (snapshot) => {
                console.log("Loading");
            },
            (error) => {
                console.log("Error in uploading image!");
                toast({
                    title: "Error in uploading image",
                    duration: 2000,
                    status: "error",
                    isClosable: true
                });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        console.log("Download url:", url);

                        const srcContentElem = document.getElementById("srcContent");                
                        const previousContent = content;
                        const newContent = content + `\n ![](${url})`; 

                        srcContentElem.value = newContent;
                        setContent(newContent);
                    });
            }
        );
    }

    function submitPost(e)
    {
        e.preventDefault();

        //  Checking if empty
        const srcContentElem = document.getElementById("srcContent");                

        if (srcContentElem.value.trim() === "")
        {
            console.log("Empty post");
            toast({
                title: "Post is empty!",
                description: "Can't submit an empty post! Make sure to write your post",
                duration: 3000,
                isClosable: true,
                status: "warning"
            });
            return;
        }

        //  TODO SuBMIT Post
        const url = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/${eventId}/post`;
        const payload = {
            content: content
        };

        postData(url, payload)
        .then((res) => {
            console.log("Response:", res);
            //  Toast deya uchit
        })
        .catch((err) => {
            console.error("Error:", err);
        });
    }

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
        >
            <Box
                py={4}
                rounded="lg"
            >
                <Box
                    my={5}
                    overflowWrap={"break-word"}
                    overflow={"clip"}
                >
                    <Heading
                        size={"md"}
                    >
                        Preview
                    </Heading>                      
                    <ReactMarkdown
                        components={ChakraUIRenderer()}
                        children={content}
                        skipHtml
                    />
                </Box>
                <Textarea
                    variant={"filled"}
                    id="srcContent"
                    minW={"xs"}
                    placeholder="What's on your mind?"
                    onChange={(e) => updateContent(e)}
                />
                <Spacer
                    h={3}
                />
                <HStack>
                <Button
                    width={"full"}
                    colorScheme={"linkedin"}
                    onClick={openFilePicker}
                    onChange={uploadImage}
                >
                    <input type="file" id="postImage" hidden />
                    Add Image
                </Button>
                <Button
                    width={"full"}
                    colorScheme={"linkedin"}
                    onClick={submitPost}
                >
                    Post
                </Button>

                </HStack>
            </Box>
        </Flex>
    );
}

export default CreatePost;