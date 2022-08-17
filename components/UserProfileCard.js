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
  
  const eventList = [
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
  
  const reviewList = [
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
  
  export default function UserProfileCard() {
    return (
      <Center py={6}>
        <Box
          maxW={"90%"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            h={"180px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xxl"}
              src={
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              }
              alt={"Author"}
              css={{
                border: "6px solid white",
              }}
            />
          </Flex>
  
          <Box p={0.1}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={600} fontFamily={"body"}>
                Dennis Reynolds
              </Heading>
            </Stack>
  
            <Tabs variant="soft-rounded" colorScheme="green">
              <Center>
                <TabList>
                  <Tab>Reviews</Tab>
                  <Tab>Past Events</Tab>
                </TabList>
              </Center>
  
              <TabPanels>
                <TabPanel>
                  <ReviewCard review={reviewList[0]} />
                  <ReviewCard review={reviewList[1]} />
                  <ReviewCard review={reviewList[0]} />
                </TabPanel>
  
                <TabPanel>
                  <Center >
                    <Box maxW="md" w={"md"} rounded={"md"} overflow={"hidden"}>
                      <EventCard event={eventList[0]} />
                      <EventCard event={eventList[1]} />
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
  