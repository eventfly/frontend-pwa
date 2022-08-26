import {
	Container,
	Stack,
	Input,
	Button,
	ButtonGroup,
	Heading,
	Box,
	Link,
	useToast,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CONFIG from "../config/config.json";
import { getData, postData } from "../services/HttpService";
import { getData_Local, isAuthenticated, storeData_Local, storeJSON_Local } from "../services/StorageService";


function Home() {
	const toast = useToast();
	const router = useRouter();

	const [authenticated, setAuthenticated] = useState(false);

	function handleSignIn() {
		const emailElem = document.getElementById("email");
		const email = emailElem.value;
		const passwordElem = document.getElementById("password");
		const password = passwordElem.value;

		//	Cheking Email Format using Regex
		if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			emailElem.value = "";
			passwordElem.value = "";

			toast({
				title: "Enter a valid email!",
				description: "The email you have entered doesn't match with any email format. Please check it again and enter.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		//	Now perform the sign up and store the creds in cookies
		const signInUrl = `${CONFIG.BASE_URL.AUTH}/api/auth/users/signin`;
		const payload = {
			email: email,
			password: password
		}

		postData(signInUrl, payload)
			.then((data) => {
				console.log("Response data:", data);

				if (data.errors) {
					data.errors.map((error, index) => {
						toast({
							title: error.message,
							duration: 3000,
							isClosable: true,
							status: "error"
						});
					})
					return;
				}

				storeData_Local("token", data.token);
				storeData_Local("userName", data.existingUser.name);
				storeData_Local("userEmail", data.existingUser.email);
				storeData_Local("userId", data.existingUser.ref_id);

				toast({
					title: "Login Successful!",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
				router.push("/");
				return;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	useEffect(() => {
		const isauth = isAuthenticated();
		console.log(isauth);

		setAuthenticated(isauth);
	}, []);

	if (authenticated) {
		router.push("/");
		return;
	}
	else {
		return (
			<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
				<Flex p={8} flex={1} align={'center'} justify={'center'}>
					<Stack spacing={4} w={'full'} maxW={'md'}>
						<Heading fontSize={'2xl'}>Sign in to your account</Heading>
						<FormControl>
							<FormLabel>Email address</FormLabel>
							<Input id="email" type="email" />
						</FormControl>
						<FormControl>
							<FormLabel>Password</FormLabel>
							<Input id="password" type="password" />
						</FormControl>
						<Stack spacing={6}>
							<Button colorScheme={'blue'} variant={'solid'} onClick={handleSignIn}>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Flex>
				<Flex flex={1}>
					<Image
						alt={'Login Image'}
						objectFit={'cover'}
						src={CONFIG.BG_LOGIN}
					/>
				</Flex>
			</Stack>
		);
	}
}

export default Home;