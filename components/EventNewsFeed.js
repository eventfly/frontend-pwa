import {Container, Tabs, TabList, TabPanels, Tab, TabPanel, VStack,useColorModeValue, Box,Center, Image, Spacer, Flex } from '@chakra-ui/react'
import PostCard from './PostCard';

import MarkdownPost from './MarkdownPost';
import {useState} from 'react';

const EventNewsFeed = ({event, posts}) => {

    const [html, setHtml] = useState('');
    return (
      <>
      
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
              // src = {event.banner_url}
              objectFit={"cover"}
            />
            
    
            <Box p={0.1}>
    
              <Tabs variant="soft-rounded" colorScheme="green">
                <Center>
                  <TabList>
                    <Tab>About</Tab>
                    <Tab>Discussion</Tab>
                  </TabList>
                </Center>
    
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
                    <VStack>
                      <MarkdownPost setHtml={setHtml} html={html} />
                        <Center >
                      <Box maxW="2xl" w={"2xl"} rounded={"2xl"} overflow={"hidden"}>
                        {
                            posts.map(
                                (post,i) => (
                                    <>
                                        <PostCard post={post}/>  
                                    </>
                                    
                                )
                            )
                        }
                      </Box>
                    </Center>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Center>
      </>
      );
}
 
export default EventNewsFeed;