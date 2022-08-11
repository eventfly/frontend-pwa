// import styles from '../styles/EventNewsFeed.module.css'
import Link from 'next/link'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {Card} from 'react-bootstrap';
import PostCard from './PostCard';
import PollCard from './PollCard';
import QuizCard from './QuizCard';

const EventNewsFeed = ({posts, polls, quizzes}) => {

    return ( 

        <>

            <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab>Posts</Tab>
                <Tab>Polls</Tab>
                <Tab>Quizzes</Tab>
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