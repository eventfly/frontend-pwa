import {
	Container,
	Stack,
	Input,
	Button,
	ButtonGroup,
	Heading,
	Box,
	Link,
	useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CONFIG from "../config/config.json";
import { getData, postData } from "../services/HttpService";
import { getData_Local, isAuthenticated, storeData_Local, storeJSON_Local } from "../services/StorageService";


function Home()
{
	const toast = useToast();
	const router = useRouter();

	const [ authenticated, setAuthenticated ] = useState(false);

	function handleSignIn()
	{
		const emailElem = document.getElementById("email");
		const email = emailElem.value;
		const passwordElem = document.getElementById("password");
		const password = passwordElem.value;

		//	Cheking Email Format using Regex
		if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) )
		{
			emailElem.value = "";
			passwordElem.value = "";

			toast({
				title: "Enter a valid email!",
				description: "The email you have entered doesn't match with any email format. Please check it again and enter.",
				status: "error",
				duration: 8000,
				isClosable: true,
			});
			return;
		}

		//	Now perform the sign up and store the creds in cookies
		const signInUrl = `${CONFIG.BASE_URL.AUTH}/api/auth/org/signin`;
		const payload = {
			email: email,
			password: password
		}

		postData(signInUrl, payload)
		.then((data) => {
			console.log("Response data:", data);
			storeData_Local("token", data.token);
			storeData_Local("userName", data.existingUser.name);
			storeData_Local("userEmail", data.existingUser.email);
			storeData_Local("userId", data.existingUser.id);

			toast({
				title: "Login Successful!",
				status: "success",
				duration: 1000,
				isClosable: true,
			});
			router.push("/scan");
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

	if (authenticated)
	{
		router.push("/");
		return;
	}
	else
	{
		return (
			<Container>
				<Stack>
					<Box height={'200px'}></Box>
					<Heading fontSize={'4xl'}>
						EventFly
					</Heading>
					<Input placeholder='Email' type="email" size='lg' id="email" />
					<Input placeholder='Password' type="password" size='lg' id="password" />
					<ButtonGroup>
						<Button colorScheme='green' size={'md'} onClick={handleSignIn}>Log In</Button>
						<Link href="/signup">
							<Button colorScheme='blue' size={'md'}>Sign Up</Button>
						</Link>
					</ButtonGroup>
				</Stack>
			</Container>
		);
	}
}

export default Home;