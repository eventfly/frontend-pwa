import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, getStoreage } from "firebase/storage";

import Layout from '../layouts/Default';
import NoAuthLayout from '../layouts/NoAuth';
import firebaseConfig from "../config/firebase.json";

import { isAuthenticated } from "../services/StorageService";


const theme = extendTheme({
	fonts: {
		body: `'Work Sans', sans-serif`,
		heading: `'Inter', sans-serif`,	
	}
});

function MyApp({ Component, pageProps})
{
	const [ isAuth, setIsAuth ] = useState(false);

	useEffect(() => {
		setIsAuth(isAuthenticated());
	});

	return (
		isAuth ? 
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		:
			<ChakraProvider theme={theme}>
				<NoAuthLayout>
					<Component {...pageProps} />
				</NoAuthLayout>	
			</ChakraProvider>
	);

}

export default MyApp;

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);