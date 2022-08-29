import EventCard from '../components/Event/EventCard'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useToast, Text, Center, Box, Heading } from '@chakra-ui/react'
import { getData_Local, isAuthenticated } from '../services/StorageService';

import CONFIG from "../config/config.json";
import { getData } from '../services/HttpService';
import FeedPostCard from '../components/FeedPostCard';


function Home()
{
	const router = useRouter();
	const toast = useToast();

	const [authenticated, setAuthenticated] = useState(false);
	const [feedPosts, setFeedPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);

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

		if (!loaded) {
			const newsFeedUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/feed?start=0&count=5`;
			getData(newsFeedUrl)
				.then((res) => {
					if (res) {
						setFeedPosts(res.posts);
						setLoaded(true);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}

	}, []);


	return (
		loaded ?
			<Box>
				{
					feedPosts.map((post, index) => {
						return (
							<FeedPostCard key={index} post={post} />
						)
					})
				}
			</Box>
			:
			<>
				<Text
					fontSize={"md"}
					textAlign={"center"}
					mt={"70%"}
				>
						{"Currently, your feed is empty :("}
				</Text>
			</>
	);
}

export default Home;