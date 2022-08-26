import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    Link,
    useBreakpointValue,
} from '@chakra-ui/react';

function EventBanner (props)
{
    const event = props.event;
    const imageUrl = event.banner_url;
    const eventTitle = event.name;
    const eventId = event.id || event._id;
    const eventStartDate = new Date(event.start_date).toDateString();
    const eventEndDate = new Date(event.end_date).toDateString();

    const eventTicketUrl = `/event/${eventId}/tickets`;

    return (
        <Flex
            w={'full'}
            h={'50vh'}
            backgroundImage={
                `url(${imageUrl})`
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(blackAlpha.900, transparent)'}
            >
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        { eventTitle }
                    </Text>
                    <Text
                        color={'white'}
                        fontWeight={400}
                        lineHeight={1.0}
                        fontSize={useBreakpointValue({ base: 'md', md: 'sm' })}>
                        {`${eventStartDate} - ${eventEndDate}`}
                    </Text>
                    <Stack direction={'row'}>
                        <Button
                            rounded={'full'}
                            color={'black'}
                            colorScheme={"yellow"}
                            _hover={{ bg: 'blue.500' }}
                        >
                            <Link
                                href={eventTicketUrl}
                            >
                                Buy Tickets / Register
                            </Link>
                        </Button>
                        <Button
                            rounded={'full'}
                            color={'white'}
                            colorScheme={"facebook"}
                            _hover={{ bg: 'whiteAlpha.500' }}
                        >
                            + Follow
                        </Button>
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
    );
}

export default EventBanner ;