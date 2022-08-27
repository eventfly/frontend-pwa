import { useEffect, useState } from 'react';
import { postData, putData } from '../services/HttpService';
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
    InputGroup,
    Select,
    useToast
} from '@chakra-ui/react';

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { useRouter } from 'next/router';


function Settings()
{
    const toast = useToast();
    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");

    function openFilePicker(e)
    {
        const avatarImageFileElem = document.getElementById("avatarImage");
        avatarImageFileElem.click();
    }

    function uploadImage(e)
    {
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
        const baseRef = ref(storage, "avatar");
        const storageRef = ref(baseRef, avatarImageFileName);
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

    function handleCancel(e)
    {
        router.back();
        return;
    }

    function handleUpdateProfile(e)
    {
        const passwordElem = document.getElementById("password");
        const confirmPasswordElem = document.getElementById("confirmPassword");
        const genderElem = document.getElementById("gender");
        const userNameElem = document.getElementById("userName");

        const userName = userNameElem.value;
        const password = passwordElem.value.trim();
        const confirmPassword = confirmPasswordElem.value.trim();
        const gender = genderElem.value;

        if (userName === "") {
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

        if (password.length < 6) {
            toast({
                title: "Password too short!",
                description: "Make sure your password is at least 6 characters long!",
                duration: 2000,
                status: "error",
                isClosable: true
            });
            passwordElem.value = "";
            confirmPasswordElem.value = "";
            return;
        }

        const participantId = getData_Local("userId");
        const editProfileUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${participantId}/edit`;
        const payload = {
            name: userName,
            password: password,
            gender: gender,
            avatar: userAvatar
        }

        putData(editProfileUrl, payload)
        .then((res) => {
            if (res.errors) {
                res.errors.map((error, index) => {
                    toast({
                        title: error.message,
                        duration: 3000,
                        isClosable: true,
                        status: "error"
                    });
                })
                return;
            }

            toast({
                title: "Profile Updated!",
                duration: 4000,
                isClosable: true,
                status: "success"
            });
            router.reload();
            return;
        })
        .catch((err) => {
            console.error(err);
        });

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
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    id="userName"
                                    placeholder="Type your name"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                    value={userName}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>New Password</FormLabel>
                                <Input
                                    placeholder="Type your password"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="password"
                                    id="password"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Confirm New Password</FormLabel>
                                <Input
                                    placeholder="Type your password again"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="password"
                                    id="confirmPassword"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Gender</FormLabel>
                                <InputGroup>
                                    <Select id="gender" colorScheme={"telegram"} defaultValue="" placeholder='Select option'>
                                        <option value='Man'>Man</option>
                                        <option value='Woman'>Woman</option>
                                        <option value='Other'>Other</option>
                                    </Select>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={6} direction={['column', 'row']}>
                                <Button
                                    bg={'red.400'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                        bg: 'red.500',
                                    }}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    w="full"
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleUpdateProfile}
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