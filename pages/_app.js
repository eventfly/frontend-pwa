import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, getStoreage } from "firebase/storage";

import Layout from '../layouts/Default';
import NoAuthLayout from '../layouts/NoAuth';
import firebaseConfig from "../config/firebase.json";

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

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);