import {
    Box,
    Tabs,
    TabList,
    Center,
    TabPanel,
    Tab,
    Heading,
    TabPanels,
    Stack,
    Container
} from "@chakra-ui/react";
import EventBodyAbout from "./EventBodyAbout";
import EventBodyDiscussion from "./EventBodyDiscussion";
import ReviewCard from "../ReviewCard";
import CONFIG from "../../config/config.json";
import { getData } from "../../services/HttpService";
import { useEffect, useState } from "react";



function EventBody(props) {
    const event = props.event;
    console.log("event", event);

    const [reviews, setReviews] = useState([]);
    const [reviewLoaded, setReviewLoaded] = useState(false);

    useEffect(() => {

        if (!reviewLoaded) {
            const getReviewUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/event/${event._id}/feedbacks`;

            getData(getReviewUrl)
                .then((res) => {
                    if (res) {
                        if (res.length > 0) {
                            console.log(res);
                            setReviews(res);
                            setReviewLoaded(true);
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }

    })


    return (
        <Box p={0.1}>
            <Stack spacing={0} align={"center"} m={5}>
            </Stack>

            <Tabs variant="soft-rounded" colorScheme="blackAlpha">
                <Center>
                    <TabList>
                        <Tab>About</Tab>
                        <Tab>Discussion</Tab>
                        <Tab>Reviews</Tab>
                    </TabList>
                </Center>
                <TabPanels>
                    <TabPanel>
                        <EventBodyAbout event={event} />
                    </TabPanel>
                    <TabPanel>
                        <Center>
                            <Box maxW="3xl" w="lg" rounded={"md"} overflow={"hidden"}>
                                <EventBodyDiscussion event={event} />
                            </Box>
                        </Center>
                    </TabPanel>
                    <TabPanel>
                        {
                            reviewLoaded ?
                                <Container>
                                    {
                                        reviews.map((review, index) => {
                                            return (
                                                <ReviewCard review={review} />
                                            )
                                        })
                                    }
                                </Container>
                                :
                                <>
                                </>
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default EventBody;