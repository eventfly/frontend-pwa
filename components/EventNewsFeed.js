import styles from '../styles/EventNewsFeed.module.css'
import Link from 'next/link'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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
                        {
                            posts.map(
                                (post) => (
                                    <PostCard post={post}/>
                                )
                            )
                        }
                        
                    </TabPanel>
                    <TabPanel>
                        {
                            polls.map(
                                (poll) => (
                                    <PollCard poll={poll}/>
                                )
                            )
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            quizzes.map(
                                (quiz) => (
                                    <QuizCard quiz={quiz}/>
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