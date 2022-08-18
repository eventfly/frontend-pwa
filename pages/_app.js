import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import Layout from '../layouts/Default';
import NoAuthLayout from '../layouts/NoAuth';
import { useEffect, useState } from "react";

import { isAuthenticated } from "../services/StorageService";


function MyApp({ Component, pageProps}) {

	const currentUser = {
		_id: '5f4b8f9b9c8f8b3f4c8b4b8b',
		name: 'John Doe',
		email: 'john@doe.com'
	}

	const [ isAuth, setIsAuth ] = useState(false);

	useEffect(() => {
		setIsAuth(isAuthenticated());
	});

	return (
		isAuth ? 
		<ChakraProvider>
			<Layout currentUser={currentUser}>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
		:
		<ChakraProvider>
			<NoAuthLayout>
				<Component {...pageProps} />
			</NoAuthLayout>	
		</ChakraProvider>
	);

}


export default MyApp
