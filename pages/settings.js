import { useState } from 'react';
import Router from "next/router";
import { postData } from '../services/HttpService';
import {getData_Local, storeData_Local} from '../services/StorageService';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Box, 
    VStack,
    Container
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';

const Settings = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit')
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        if(password != confirmPassword){
            console.log("Password doesn't match")
        }
        else{
            const userID = getData_Local("userId"); 

            const updatedUrl = '';
            let updatedParticipant = {
                userID: userID,
                name: name,
                email: email,
                password: password,
                profileImage: profileImage

            }

            postData(updatedUrl, updatedParticipant)
            .then((data) => {
                console.log("Response data:", data);
                storeData_Local("token", data.token);
            }).catch((err)=>{
                console.log('error')
            })

        }

        

        

    }

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
                            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} textAlign='center'>
                                Account
                            </Heading>
                            <FormControl id="userName">
                                <Stack direction={['column', 'row']} spacing={6}>
                                <Center>
                                    <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                                    </Avatar>
                                </Center>
                                <Center w="full">
                                    <Button w="full">Change Profile Photo</Button>
                                </Center>
                                </Stack>
                            </FormControl>
                            <FormControl id="userName">
                                <FormLabel>Name</FormLabel>
                                <Input
                                placeholder="UserName"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                                />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <Input
                                placeholder="your-email@example.com"
                                _placeholder={{ color: 'gray.500' }}
                                type="email"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                placeholder="password"
                                _placeholder={{ color: 'gray.500' }}
                                type="password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </FormControl>
                            <FormControl id="confirmPassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                placeholder="password"
                                _placeholder={{ color: 'gray.500' }}
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {setConfirmPassword(e.target.value)}}
                                />
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
                                onClick={(e) => handleSubmit(e)}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Save
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