import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    Select,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { postData } from "../services/HttpService";


import CONFIG from "../config/config.json";


function SignUp()
{
    const router = useRouter();
    const toast = useToast();
    
    const [showPassword, setShowPassword] = useState(false);

    function submitData(e)
    {
        e.preventDefault();

        const firstNameElem = document.getElementById("firstName");
        const lastNameElem = document.getElementById("lastName");
        const emailElem = document.getElementById("email");
        const passwordElem = document.getElementById("password");
        const genderElem = document.getElementById("gender");
        const dobElem = document.getElementById("dob");

        const firstName = firstNameElem.value.trim();
        const lastName = lastNameElem.value.trim();
        const email = emailElem.value.trim();
        const password = passwordElem.value.trim();
        const gender = genderElem.value.trim();
        const dob = dobElem.value;

        if (email === "") {
            toast({
                title: "Enter your email!",
                duration: 2000,
                status: "info",
                isClosable: true
            });
            return;
        }

        //	Cheking Email Format using Regex
		if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) )
		{
			emailElem.value = "";
			toast({
				title: "Enter a valid email!",
				description: "The email you have entered doesn't match with email format. Please check it again and enter.",
				status: "warning",
				duration: 8000,
				isClosable: true,
			});
			return;
		}

        if (password === "") {
            toast({
                title: "Enter a password!",
                duration: 2000,
                status: "warning",
                isClosable: true
            });
            return;
        }

        if (password.length < 6) {
            toast({
                title: "Password must be at least 6 character long!",
                duration: 2000,
                status: "warning",
                isClosable: true
            });
            return;
        }

        if (firstName === "" || lastName === "") {
            toast({
                title: "Enter your both name!",
                duration: 2000,
                status: "warning",
                isClosable: true
            });
            return;
        }

        if (gender === "") {
            toast({
                title: "Select your gender",
                duration: 2000,
                status: "warning",
                isClosable: true
            });
            return;
        }

        if (dob == "") {
            toast({
                title: "Select your date of birth!",
                duration: 2000,
                status: "warning",
                isClosable: true
            });
            return;
        }

        const fullName = `${firstName} ${lastName}`;
        const dobValue = new Date(dob).toISOString();

        const signUpUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant`;
        const payload = {
            name: fullName,
            password: password,
            email: email,
            gender: gender,
            dob: dobValue
        }
        console.table(payload);

        postData(signUpUrl, payload)
            .then((res) => {
                console.log("Response:", res);

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

                if (res.token) {
                    toast({
                        title: "Account created!",
                        description: `You can now login using email ${res.user.email}`,
                        duration: 3000,
                        isClosable: true,
                        status: "success"
                    });
                    router.push("/login");
                    return;
                }
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    }

    return (
        <Flex
            minH={'50%'}
            h={"100vh"}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to find new events around you ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" id="firstName" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" id="lastName" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" id="email" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} id="password" />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
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
                        <FormControl isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <InputGroup>
                                <Input type={"date"} defaultValue={""} id="dob"></Input>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={submitData}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'} href="/login">Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default SignUp;