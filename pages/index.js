import EventCard from '../components/EventCard'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useToast, Text, Box, Heading } from '@chakra-ui/react'
import { getData_Local, isAuthenticated } from '../services/StorageService';

import CONFIG from "../config/config.json";
import { getData } from '../services/HttpService';



function Home()
{
	const router = useRouter();
	const toast = useToast();

	const [authenticated, setAuthenticated] = useState(false);
	const [feed, setFeed] = useState(null);
	const [loaded, setLoaded] = useState(true);

	useEffect(() => {
		const isAuth = isAuthenticated();
		const userId = getData_Local("userId");
		setAuthenticated(isAuth);

		if (!isAuth) {
			toast({
				title: "Please login first!",
				status: "error",
				duration: 1000,
				isClosable: true
			});
			router.push("/login");
			return;
		}

		const newsFeedUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/feed`;
		getData(newsFeedUrl)
			.then((res) => {
				console.log("Newsfeed data:", res);
				setFeed(res);
				setLoaded(true);
			})
			.catch((err) => {
				console.error(err);
			});

	}, []);

	let events = [
		{
			'id': 1,
			'image': 'event1.jpg',
			'title': 'Chicago Art Exhibition 2022',
			'date': 'Dec 12,2021',
			'url': '1',
			'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
		},
		{
			'id': 2,
			'image': 'event2.jpg',
			'title': 'Chicago Art Exhibition 2022',
			'date': 'Dec 12,2021',
			'url': '2',
			'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
		}
	]


	return (
		loaded ?
			<>
				<Box textAlign='center' width='100%' backgroundColor='green'>
					<Heading as='h2' size='2xl' padding='10px' color='white'>
						Newsfeed
					</Heading>
				</Box>
				<>
				{/* {
					feed.map(
						(event, index) => (
							<EventCard key={index} event={event} />
						)
					)
				} */}
				</>
			</>
			:
			<></>
	);
}

export default Home;