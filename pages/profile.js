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
    Text,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from "@chakra-ui/react";

import ReviewCard from "../components/ReviewCard";
import EventCard from "../components/Event/EventCard";
import { useEffect, useState } from "react";
import CONFIG from "../config/config.json";
import { getData } from "../services/HttpService";
import { getData_Local, storeData_Local } from "../services/StorageService";
import { Container } from "react-bootstrap";

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


function UserProfileCard() {
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [reviewsLoaded, setReviewsLoaded] = useState(false);
    const [pastEventsLoaded, setPastEventsLoaded] = useState(false);

    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [eventList, setEventList] = useState([]);
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {

        const userId = getData_Local("userId");

        if (!profileLoaded) {
            const getProfileUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${userId}/profile`;

            getData(getProfileUrl)
                .then((res) => {
                    setUserAvatar(res.avatar);
                    setUserEmail(res.email);
                    setUserName(res.name);
                    setProfileLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        }


        if (!reviewsLoaded) {
            const getReviewUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${userId}/feedbacks`;

            getData(getReviewUrl)
                .then((res) => {
                    if (res) {
                        if (res.length > 0) {
                            console.log("Review List", res);
                            setReviewList(res);
                            setReviewsLoaded(true);
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        if (!pastEventsLoaded) {
            const getPastEventsUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/${userId}/events`;

            getData(getPastEventsUrl)
                .then((res) => {
                    if (res) {
                        if (res.length > 0) {
                            console.log("Past events", res);
                            setEventList(res);
                            setPastEventsLoaded(true);
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }

    });

    storeData_Local("userName", userName);
    storeData_Local("userEmail", userEmail);
    storeData_Local("userAvatar", userAvatar);

    return (
        <Center py={6}>
            <Box
                maxW={"100%"}
                w={"full"}
                rounded={"md"}
            >
                {
                    profileLoaded ?
                        <Flex justify={"center"} mt={12}>
                            <Avatar
                                size={"2xl"}
                                src={userAvatar}
                                css={{
                                    border: "6px solid white",
                                }}
                            />
                        </Flex>
                        :
                        <></>
                }

                <Box p={0.1}>
                    {
                        profileLoaded ?
                            <Stack spacing={0} align={"center"} mb={5}>
                                <Heading fontSize={"2xl"} fontWeight={600} fontFamily={"body"}>
                                    {userName}
                                </Heading>
                            </Stack>
                            :
                            <></>
                    }

                    <Tabs variant="soft-rounded" colorScheme="teal">
                        <Center>
                            <TabList>
                                <Tab>Reviews</Tab>
                                <Tab>Past Events</Tab>
                            </TabList>
                        </Center>

                        <TabPanels>
                            <TabPanel>
                                <Center>
                                    <Box maxW="lg" w="lg" rounded={"md"} overflow={"hidden"}>
                                        {
                                            reviewsLoaded ?
                                                <>
                                                    {
                                                        reviewList.map((review, index) => {
                                                            return <ReviewCard key={index} review={review} />
                                                        })
                                                    }
                                                </>
                                                :
                                                <Text
                                                    fontSize={"md"}
                                                    textAlign={"center"}
                                                    mt={"10%"}
                                                >
                                                    You haven't given any reviews yet.
                                                </Text>
                                        }
                                    </Box>
                                </Center>
                            </TabPanel>

                            <TabPanel>
                                <Center>
                                    <Box maxW="full" w="full" rounded={"md"} overflow={"hidden"}>
                                        {
                                            pastEventsLoaded ?
                                                <>
                                                    {
                                                        eventList.map((event, index) => {
                                                            return <EventCard key={index} eventId={event.id} />
                                                        })
                                                    }
                                                </>
                                                :
                                                <>
                                                    <Text
                                                        fontSize={"md"}
                                                        textAlign={"center"}
                                                        mt={"10%"}
                                                    >
                                                        {"You haven't attended any events."}
                                                    </Text>
                                                </>
                                        }
                                    </Box>
                                </Center>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </Center>
    );
}


export default UserProfileCard;