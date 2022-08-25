import { useEffect, useState } from 'react';
import { postData } from '../services/HttpService';
import { getData_Local, storeData_Local } from '../services/StorageService';
import CONFIG from "../config/config.json";

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
    Box,
    VStack,
    Container,
    RadioGroup,
    HStack,
    Radio,
    FormHelperText,
    useToast
} from '@chakra-ui/react';

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

function Settings() {
    const toast = useToast();

    const [loaded, setLoaded] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userAvatar, setUserAvatar] = useState("");


    function openFilePicker(e) {
        const avatarImageFileElem = document.getElementById("avatarImage");
        avatarImageFileElem.click();
    }

    function uploadImage(e) {
        const avatarImageFile = e.target.files[0];
        const fileNameParts = avatarImageFile.name.split(".");
        const fileExtension = fileNameParts[fileNameParts.length - 1];

        const randomUUID = crypto.randomUUID();
        const avatarImageFileName = `${randomUUID}.${fileExtension}`;
        console.log(avatarImageFileName);

        //  Uploading to firebase
        //  baseRef is the default bucket reference
        //  storageRef is the folder reference for 'avatar'
        const storage = getStorage();
        const baseRef = ref(storage, avatarImageFileName);
        const storageRef = ref(baseRef, "avatar");
        const uploadTask = uploadBytesResumable(storageRef, avatarImageFile);

        uploadTask.on("state_changed",
            (snapshot) => {
                console.log("Loading");
            },
            (error) => {
                console.log("Error in uploading avatar!");
                toast({
                    title: "Error in uploading avatar image",
                    duration: 2000,
                    status: "error",
                    isClosable: true
                });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        console.log("Download url:", url);
                        storeData_Local("userAvatar", url);
                        setUserAvatar(url);
                    });
            }
        );
    }

    function updateProfile(e)
    {
        e.preventDefault();

        const passwordElem = document.getElementById("password");
        const confirmPasswordElem = document.getElementById("confirmPassword");
        const genderElem = document.getElementById("gender");

        const userName = document.getElementById("userName");
        const password = passwordElem.value.trim();
        const confirmPassword = confirmPasswordElem.value.trim();
        const gender = genderElem.value;

        if (userName === "")
        {
            toast({
                title: "Username can't be blank!",
                duration: 2000,
                isClosable: true,
            });
            return;            
        }

        if (password != confirmPassword) {
            toast({
                title: "Passwords don't match!",
                description: "Make sure you have entered your password correctly!",
                duration: 2000,
                status: "error",
                isClosable: true
            });
            passwordElem.value = "";
            confirmPasswordElem.value = "";
            return;
        }

        console.log("password: ", password);
        console.log("confirmPassword:", confirmPassword);
        console.log("avatar Link: ", userAvatar);

        const url = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/profile`;
        //  TO DO
        //  POST/UPDATE data to backend
    }

    useEffect(() => {
        //  Settings existing data
        setUserName(getData_Local("userName"));
        setUserAvatar(getData_Local("userAvatar"));
    }, []);


    return (
        <>
            <Box textAlign='center' width='100%' backgroundColor='green'>
                <Heading as='h2' size='2xl' padding='10px' color='white'>
                    Settings
                </Heading>
            </Box>

            <VStack>
                <Container maxW='2xl' >
                    <Flex
                        align={'center'}
                        justify={'center'}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        width='100%'
                    >
                        <Stack
                            spacing={4}
                            bg={useColorModeValue('white', 'gray.700')}
                            p={6}
                            my={12}
                            width='100%'
                        >
                            <FormControl>
                                <Stack direction={['column', 'row']} spacing={6}>
                                    <Center>
                                        <Avatar size="xl" src={userAvatar}>
                                        </Avatar>
                                    </Center>
                                    <Center w="full">
                                        <Button w="full" onClick={openFilePicker}>
                                            Change Profile Photo
                                            <input type="file" hidden id="avatarImage" onChange={uploadImage} />
                                        </Button>
                                    </Center>
                                </Stack>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    id="userName"
                                    placeholder="Type your name"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder="Type your password"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="password"
                                    id="password"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    placeholder="Type your password again"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="password"
                                    id="confirmPassword"
                                />
                            </FormControl>
                            <FormControl as='fieldset'>
                                <FormLabel as='legend'>Gender</FormLabel>
                                <RadioGroup defaultValue='Itachi' id="gender">
                                    <HStack spacing='24px'>
                                        <Radio value='Man'>Man</Radio>
                                        <Radio value='Woman'>Woman</Radio>
                                        <Radio value='Others'>Others</Radio>
                                    </HStack>
                                </RadioGroup>
                            </FormControl>
                            <Stack spacing={6} direction={['column', 'row']}>
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                        bg: 'red.500',
                                    }}>
                                    Cancel
                                </Button>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={updateProfile}
                                >
                                    Update Profile
                                </Button>
                            </Stack>
                        </Stack>
                    </Flex>

                </Container>
            </VStack>
        </>

    );
}

export default Settings;