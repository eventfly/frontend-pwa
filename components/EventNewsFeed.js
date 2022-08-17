import styles from '../styles/EventNewsFeed.module.css'
import {Container, Tabs, TabList, TabPanels, Tab, TabPanel, VStack } from '@chakra-ui/react'
import PostCard from './PostCard';

const EventNewsFeed = ({posts}) => {

    return ( 

        <>

            <Tabs size="lg" isFitted variant='enclosed' >
                <TabList className={styles.eventNewsFeedTab} >
                    <Tab _selected={{fontSize:"x-large", bgColor:'green', color:'white'}} _hover={{fontSize:"x-large"}}>Newsfeed</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <VStack>
                        <Container maxW='2xl' >
                            {
                                posts.map(
                                    (post) => (
                                        <PostCard post={post}/>
                                    )
                                )
                            } 
                        </Container>
                    </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>

    );
}
 
export default EventNewsFeed;