import {
	chakra,
	Box,
	Flex,
	SimpleGrid,
	Link,
	Stack,
	Text,
	Icon,
	Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CONFIG from "../../../config/config.json";
import { getData } from "../../../services/HttpService";


function Feature(props) {
	return (
		<Flex align="center">
			<Flex shrink={0}>
				<Icon
					boxSize={5}
					mt={1}
					mr={2}
					color="brand.500"
					_dark={{
						color: "brand.300",
					}}
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					></path>
				</Icon>
			</Flex>
			<Box ml={4}>
				<chakra.span
					mt={2}
					color="gray.700"
					_dark={{
						color: "gray.400",
					}}
				>
					{props.children}
				</chakra.span>
			</Box>
		</Flex>
	);
};

function TicketClassCard(props)
{
	const ticket = props.ticket;
	const ticketPrice = ticket.price;
	const ticketClass = ticket.class;
	const ticketPerks = ticket.perks;
	const ticketAvailable = ticket.available;
	const ticketQuantity = ticket.quantity;

	return (
		<Box
			rounded={["none", "lg"]}
			shadow={["none", "md"]}
			bg="white"
		>
			<Flex
				direction="column"
				justify="space-between"
				p="6"
				borderBottomWidth="1px"
				color="gray.200"
				_dark={{
					color: "gray.600",
				}}
			>
				<chakra.p
					mb={1}
					fontSize="lg"
					fontWeight="semibold"
					color="gray.700"
					_dark={{
						color: "gray.400",
					}}
				>
					{ ticketClass }
				</chakra.p>
				<Text
					mb={2}
					fontSize="5xl"
					fontWeight={["bold", "extrabold"]}
					color="gray.900"
					_dark={{
						color: "gray.50",
					}}
					lineHeight="tight"
				>
					{ ticketPrice }
					<chakra.span
						fontSize="2xl"
						fontWeight="medium"
						color="gray.600"
						_dark={{
							color: "gray.400",
						}}
					>
						{"  BDT"}
					</chakra.span>
					<br/>
					<chakra.code
						fontSize={"sm"}
					>
						{`${ticketAvailable}/${ticketQuantity} tickets available!`}
					</chakra.code>
				</Text>
				<Button
					w={["full", , "auto"]}
					display="inline-flex"
					alignItems="center"
					justifyContent="center"
					px={5}
					py={3}
					fontWeight="bold"
					fontSize={"xl"}
					rounded="md"
					shadow="md"
					colorScheme={"whatsapp"}
				>
					<Link href="#">
						Purchase
					</Link>
				</Button>
			</Flex>
			<Stack direction="column" p="6" spacing="3" flexGrow="1">
				{
					ticketPerks.map((each, index) => {
						return (
							<Feature key={index}>{ each }</Feature>
						)
					})
				}
			</Stack>
		</Box>
	);
}


function TicketClassPage()
{
	const router = useRouter();

	const [ ticketClassList, setTicketClassList ] = useState([]);
	const [ loaded, setLoaded ] = useState(false);

	useEffect(() => {

		if (!router.isReady) {
			return;
		}
		
		if (!loaded)
		{
			const eventId = router.query.event_id;
			const eventDetailUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/event/${eventId}`;
	
			getData(eventDetailUrl)
			.then((res) => {
				console.log(res);
				setTicketClassList(res.tickets);
				setLoaded(true);
			})
			.catch((err) => {
				console.error(err);
			});	
		}
	});


	return (
		<Flex
			w="full"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				py="64px"
				px="10"
				bg="gray.100"
				_dark={{
					bg: "gray.700",
				}}
			>
				<Box maxW="3xl" py="20" mx="auto">
					<SimpleGrid columns={[1, , , 3]} gap={[16, 8]}>
						{
							ticketClassList.map((each, index) => {
								return (
									<TicketClassCard key={index} ticket={each}/>
								)
							})
						}
					</SimpleGrid>
				</Box>
			</Box>
		</Flex>
	);
}

export default TicketClassPage;