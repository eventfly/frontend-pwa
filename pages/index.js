import EventCard from '../components/EventCard'
import FormTitle from "../components/Form/FormTitle";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Container, VStack, useToast } from '@chakra-ui/react'
import { isAuthenticated } from '../services/StorageService';

import CONFIG from "../config/config.json";
import { getData } from '../services/HttpService';


function Home()
{
	const router = useRouter();
	const toast = useToast();

	const [ authenticated, setAuthenticated ] = useState(false);
	const [ events, setEvents ] = useState(null);
	const [ loaded, setLoaded ] = useState(false);

	useEffect(() => {
		const isAuth = isAuthenticated();
		setAuthenticated(isAuth);

		if (!isAuth)
		{
			toast({
				title: "Please login first!",
				status: "error",
				duration: 1000,
				isClosable: true
			});
			router.push("/login");
			return;
		}

		if (!loaded)
		{
			const newsFeedUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/feed`;
			getData(newsFeedUrl)
			.then((res) => {
				console.log("Newsfeed data:", res);
				setEvents(res);
				setLoaded(true);
			})
			.catch((err) => {
				console.error(err);
			});	
		}
	
	}, []);

	// let events = [
	// 	{
	// 		'id': 1,
	// 		'image': 'event1.jpg',
	// 		'title': 'Chicago Art Exhibition 2022',
	// 		'date': 'Dec 12,2021',
	// 		'url': '1',
	// 		'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
	// 	},
	// 	{
	// 		'id': 2,
	// 		'image': 'event2.jpg',
	// 		'title': 'Chicago Art Exhibition 2022',
	// 		'date': 'Dec 12,2021',
	// 		'url': '2',
	// 		'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
	// 	}
	// ]

	return (
		authenticated ?
			<div className="page_style">
				<FormTitle title="Newsfeed"/>
				<VStack>
					<Container maxW='2xl' >
						{
							events.map(
								(event, index) => (
									<EventCard key={index} event={event} />
								)
							)
						}
					</Container>
				</VStack>
			</div>
		:
			<></>
	);
}

export default Home;