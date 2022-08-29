import {
  Box,
  Tabs,
  TabList,
  Center,
  TabPanel,
  Tab,
  Heading,
  TabPanels,
  Stack,
  Container,
  Toast,
  useToast,
  Button,
  Textarea,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderProps,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import EventBodyAbout from './EventBodyAbout';
import EventBodyDiscussion from './EventBodyDiscussion';
import ReviewCard from '../ReviewCard';
import CONFIG from '../../config/config.json';
import { getData, postData } from '../../services/HttpService';
import { useEffect, useState } from 'react';

function EventBody(props) {
  const toast = useToast();

  const event = props.event;
  console.log('event', event);

  const [reviews, setReviews] = useState([]);
  const [reviewLoaded, setReviewLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);

  useEffect(() => {
    if (!reviewLoaded) {
      const getReviewUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/event/${event._id}/feedbacks`;

      getData(getReviewUrl)
        .then((res) => {
          if (res) {
            if (res.length > 0) {
              console.log(res);
              setReviews(res);
              setReviewLoaded(true);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  function handlePostReview() {
    const reviewElem = document.getElementById('comment');
    const commentText = reviewElem.value;

    console.log(sliderValue);
    const rating = sliderValue[1];

    const postReviewUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/feedback`;
    const payload = {
      event_id: event.id || event._id,
      comment: commentText,
      rating: rating,
    };

    console.log(payload);

    postData(postReviewUrl, payload)
      .then((res) => {
        console.log(res);
        toast({
          title: 'Feedback submitted!',
          duration: 3000,
          status: 'success',
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    reviewElem.value = '';
  }

  return (
    <Box p={0.1}>
      <Stack spacing={0} align={'center'} m={5}></Stack>

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
              <Box maxW="3xl" w="lg" rounded={'md'} overflow={'hidden'}>
                <EventBodyDiscussion event={event} />
              </Box>
            </Center>
          </TabPanel>
          <TabPanel>
            <Center>
              <Heading>Submit a review</Heading>
            </Center>
            <Box p={4}>
              <Textarea
                borderColor={'blackAlpha'}
                value={'What do you think?'}
                id="comment"
              />
              <RangeSlider
                id="rating"
                aria-label={['min', 'max']}
                min={0}
                max={5}
                defaultValue={[1, 20]}
                onChange={(val) => setSliderValue(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Button
                width={'full'}
                colorScheme={'whatsapp'}
                onClick={handlePostReview}
              >
                Submit
              </Button>
            </Box>

            {reviewLoaded ? (
              <Container>
                {reviews.map((review, index) => {
                  return <ReviewCard review={review} />;
                })}
              </Container>
            ) : (
              <></>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default EventBody;
