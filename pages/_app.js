import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import Layout from '../layouts/Default';
import NoAuthLayout from '../layouts/NoAuth';
import { useEffect } from "react";
import buildClient from '../api/build-client';

import axios from 'axios';


function MyApp({ Component, pageProps}) {

	const currentUser = {
		_id: '5f4b8f9b9c8f8b3f4c8b4b8b',
		name: 'John Doe',
		email: 'john@doe.com'
	}

	if (currentUser !== null) {
		return (


			<ChakraProvider>
				<Layout currentUser={currentUser}>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>

		)
	}
	else {
		return (
			<NoAuthLayout>
				<Component {...pageProps} />
			</NoAuthLayout>
		)
	}

}


export default MyApp
