import {Container, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Box, Spacer, Flex } from '@chakra-ui/react'
import PostCard from './PostCard';


const EventNewsFeed = ({event, posts}) => {
    return ( 
        <>
            <Tabs size="lg" isFitted variant='enclosed' >
                <TabList backgroundColor='teal.100' color='blue' fontWeight='bold' >
                    <Tab _selected={{fontSize:"x-large", bgColor:'green', color:'white'}} _hover={{fontSize:"x-large"}}>About</Tab>
                    <Tab _selected={{fontSize:"x-large", bgColor:'green', color:'white'}} _hover={{fontSize:"x-large"}}>Eventfeed</Tab>
                </TabList>
                <TabPanels>
                <TabPanel>
                    <VStack>
                        <Container maxW='2xl' >
                        <Box textAlign='justify' fontSize='large'>
                            {event.description}
                        </Box>
                            
                        </Container>
                    </VStack>
                    </TabPanel>
                    <TabPanel>
                        {
                            posts.map(
                                (post,i) => (
                                    <>
                                        <PostCard post={post}/>  
                                    </>
                                    
                                )
                            )
                        } 
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
 
export default EventNewsFeed;