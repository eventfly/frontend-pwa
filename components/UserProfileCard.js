import {
	Heading,
	Avatar,
	Box,
	Center,
	Image,
	Flex,
	Stack,
	useColorModeValue,
	Tab,
	Tabs,
	TabList,
	TabPanel,
	TabPanels,
} from "@chakra-ui/react";

import ReviewCard from "./ReviewCard";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";

import { getData_Local } from "../services/StorageService";


function UserProfileCard()
{
	const _eventList = [
		{
			id: 1,
			image: "event1.jpg",
			title: "Chicago Art Exhibition 2022",
			date: "Dec 12,2021",
			url: "1",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		},
		{
			id: 2,
			image: "event2.jpg",
			title: "Chicago Art Exhibition 2022",
			date: "Dec 12,2021",
			url: "2",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		},
	];
	
	const _reviewList = [
		{
			date: "10 March, 2021",
			stars: 3,
			eventTitle: "Cannes Film Festival 2021",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		},
		{
			date: "20 July 2021",
			stars: 4,
			eventTitle: "Charcoal Art Exhibition 2.0",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		},
	];

	const [ userName, setUserName ] = useState("");
	const [ userAvatar, setUserAvatar ] = useState("");
	const [ loaded, setLoaded ] = useState(false);
	const [ eventList, setEventList ] = useState(null);
	const [ reviewList, setReviewList ] = useState(null);
	
	useEffect(() => {
		setUserName(getData_Local("userName"));
		setUserAvatar(getData_Local("userAvatar"));

		//	TODO	->	Get Data from Backend
		setEventList(_eventList);
		setReviewList(_reviewList);
		//	---------------------------------

		setLoaded(true);
	}, []);

	return (
		loaded ?
			<Center py={6}>
				<Box
					maxW={"90%"}
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					rounded={"md"}
				>
					<Flex justify={"center"} mt={12}>
						<Avatar
							size={"2xl"}
							src={ userAvatar}
							css={{
								border: "6px solid white",
							}}
						/>
					</Flex>

					<Box p={0.1}>
						<Stack spacing={0} align={"center"} mb={5}>
							<Heading fontSize={"2xl"} fontWeight={600} fontFamily={"body"}>
								{ userName }
							</Heading>
						</Stack>

						<Tabs variant="soft-rounded" colorScheme="teal">
							<Center>
								<TabList>
									<Tab>Reviews</Tab>
									<Tab>Past Events</Tab>
								</TabList>
							</Center>

							<TabPanels>
								<TabPanel>
									{
										reviewList.map((review, index) => {
											return <ReviewCard key={index} review={review} />
										})
									}
								</TabPanel>

								<TabPanel>
									<Center >
										<Box maxW="lg" w="lg" rounded={"md"} overflow={"hidden"}>
											{
												eventList.map((event, index) => {
													return <EventCard key={index} event={event} />
												})
											}
										</Box>
									</Center>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</Box>
			</Center>
		:
			<></>
	);
}


export default UserProfileCard;