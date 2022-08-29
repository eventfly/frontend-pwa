import {
	Flex,
	Box,
	chakra,
	Heading,
	Link
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";


function ReviewCard (props)
{
	const review = props.review;
	const reviewDate = new Date(props.review.created_at).toDateString() || "";

	const renderStars = () => {
		const TOTAL_STARS = 5;
		var starList = [];

		for (var i=0; i < review.rating; i++) {
			starList.push (
				<StarIcon color={'green.500'} key={i} />
			);
		}
		for (var i=0; i < TOTAL_STARS - review.rating; i++) {
			starList.push (
				<StarIcon color={'green.200'} key={i+review.rating} />
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
				bg="white"
				_dark={{
					bg: "gray.800",
				}}
				w="lg"
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
						{ reviewDate }
					</chakra.span>
				</Flex>

				<Flex mt={2} mb={2}>
					{ renderedStars }
				</Flex>

				<Flex>
	            	<Heading fontSize={'lg'} fontWeight={600} fontFamily={'body'}>
						<Link
							href={`/event/${review.event_id.id}`}
						>
	        	    		{ review.event_id.name }
						</Link>
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
						{ review.comment }
					</chakra.p>
				</Box>
			</Box>
		</Flex>
	);
}

export default ReviewCard;