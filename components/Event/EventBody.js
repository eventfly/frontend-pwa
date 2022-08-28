import {
    Box,
    Tabs,
    TabList,
    Center,
    TabPanel,
    Tab,
    Heading,
    TabPanels,
    Stack
} from "@chakra-ui/react";
import EventBodyAbout from "./EventBodyAbout";
import EventBodyDiscussion from "./EventBodyDiscussion";


function EventBody(props)
{
    const event = props.event;

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
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default EventBody;