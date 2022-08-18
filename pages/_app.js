import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import Layout from '../layouts/Default';
import NoAuthLayout from '../layouts/NoAuth';
import { useEffect, useState } from "react";

import { isAuthenticated } from "../services/StorageService";


function MyApp({ Component, pageProps})
{
	const [ isAuth, setIsAuth ] = useState(false);

	useEffect(() => {
		setIsAuth(isAuthenticated());
	});

	return (
		isAuth ? 
			<ChakraProvider>
				<Layout>
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

export default MyApp;