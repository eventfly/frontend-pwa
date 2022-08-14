import styles from '../styles/EventNewsFeed.module.css'
import Link from 'next/link'
import {Container, Tabs, TabList, TabPanels, Tab, TabPanel, VStack } from '@chakra-ui/react'
import {Card} from 'react-bootstrap';
import PostCard from './PostCard';
import PollCard from './PollCard';
import QuizCard from './QuizCard';

const EventNewsFeed = ({posts, polls, quizzes}) => {

    return ( 

        <>

            <Tabs size="lg" isFitted variant='enclosed' >
                <TabList className={styles.eventNewsFeedTab} >
                    <Tab _selected={{fontSize:"x-large", bgColor:'green', color:'white'}} _hover={{fontSize:"x-large"}}>Posts</Tab>
                    <Tab _selected={{fontSize:"x-large", bgColor:'green', color:'white'}} _hover={{fontSize:"x-large"}}>Polls</Tab>
                    <Tab _selected={{fontSize:"x-large", bgColor:'green', color:'white'}} _hover={{fontSize:"x-large"}}>Quizzes</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <VStack>
                        <Container maxW='md' >
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
                    <TabPanel>
                    <VStack>
                        <Container maxW='md' >
                        {
                            polls.map(
                                (poll) => (
                                    <PollCard poll={poll}/>
                                )
                            )
                        }
                        </Container>
                    </VStack>
                    </TabPanel>
                    <TabPanel>
                    <VStack>
                        <Container maxW='md' >
                        {
                            quizzes.map(
                                (quiz) => (
                                    <QuizCard quiz={quiz}/>
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