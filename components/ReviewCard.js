import {
	Flex,
	Box,
	chakra,
	Heading
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";


export default function ReviewCard ({ review }) {

	const renderStars = () => {
		const TOTAL_STARS = 5;
		var starList = [];

		for (var i=0; i < review.stars; i++) {
			starList.push (
				<StarIcon color={'green.500'} key={i} />
			);
		}
		for (var i=0; i < TOTAL_STARS - review.stars; i++) {
			starList.push (
				<StarIcon color={'green.200'} key={i+review.stars} />
			);
		}
		return starList;
	}

	const renderedStars = renderStars();

	return (
		<Flex
			pt={25}
			pb={25}
			w="full"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				mx="auto"
				px={4}
				py={3}
				rounded="lg"
				shadow="lg"
				bg="gray.100"
				_dark={{
					bg: "gray.800",
				}}
				maxW="lg"
			>
				<Flex justifyContent="space-between" alignItems="center">
					<chakra.span
						fontSize="sm"
						color="gray.600"
						_dark={{
							color: "gray.400",
						}}
					>
						{ review.date }
					</chakra.span>
				</Flex>

				<Flex mt={2} mb={2}>
					{ renderedStars }
				</Flex>

				<Flex>
	            	<Heading fontSize={'lg'} fontWeight={600} fontFamily={'body'}>
	        	    	{ review.eventTitle }
    		        </Heading>
				</Flex>

				<Box mt={2}>
					<chakra.p
						mt={2}
						fontSize={'sm'}
						color="gray.600"
						_dark={{
							color: "gray.300",
						}}
					>
						{ review.description }
					</chakra.p>
				</Box>
			</Box>
		</Flex>
	);
}
