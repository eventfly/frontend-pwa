import {Stack, RadioGroup, Radio, Checkbox, Avatar, Box, Flex, Text, Spacer, Button} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'
  import {getData_Local, storeData_Local} from '../../services/StorageService';
  import { putData } from '../../services/HttpService';
import {useState, useEffect} from 'react';
import CONFIG from "../../config/config.json";

function QuizCard (props)
{
    const post = props.post;
    const postId = post._id;
    const [quizAnswers, setQuizAnswers] = useState([]);
    const size = post.questions.length;
    const [quizCreated,setQuizCreated] = useState(false);

    function handleQuizAnswers(event, index1, index2)
    {
        console.log("inside handle Answer")
        console.log("i:", index1)
        console.log("j:", index2)
        
        // quizAnswers[index1].answer_index = index2;
        var temp = quizAnswers;
        temp[index1].question_index = index1;
        temp[index1].answer_index = index2;
        setQuizAnswers(temp);

        console.log("quiz Answers:");
        console.table(quizAnswers);
    }

    function sendData()
    {
        console.log("inside sendData")

        console.log("quizAnswers--")
        console.log(quizAnswers);


        const userID = getData_Local("userId"); 

        const quizUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/post/${postId}/answer`;
        const payload = {
            quiz_answers: quizAnswers
        }
        console.log("payload--")
        console.log(payload)

        putData(quizUrl, payload)
        .then((data) => {
            console.log("Response data:", data);
        }).catch((err) => {
            console.log("error");
        });
    }

    useEffect(() => {
        if(!quizCreated){
            var temp = []
            for( var i = 0; i < size; i++){
                temp.push({
                    "question_index":i,
                    "answer_index": 0
                });
            }
            setQuizAnswers(temp);
            setQuizCreated(true);
        }
        
    }, []);

    return ( 

        <>

            <Popover>
                <Stack direction='column'>
                    <PopoverTrigger>
                        <Button colorScheme='teal' variant='ghost'>Quiz Voting!</Button>
                    </PopoverTrigger> 
                </Stack>
                
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                    {
                        post.questions.map(
                            (question, i) => (
                                <>
                                    <Box fontSize='1.2rem' padding='1%' backgroundColor='teal' color='white' borderRadius='0.7%'>
                                        {question.question}
                                    </Box>
                                    
                                    <RadioGroup >
                                        <Stack padding='1%' backgroundColor='white' color='#464644' borderRadius='0.7%'>
                                        {   
                                            question.answers.map(
                                                (answer, j) => (
                                                <>
                                                    <Radio value={answer.answer} key={j} onChange={(e) => handleQuizAnswers(e, i, j)}>
                                                        {answer.answer}
                                                    </Radio>
                                                </>
                                                )
                                            )
                                        }                   
                                        </Stack>
                                    </RadioGroup>                        
                                </>
                            )
                        )
                    }
                    <Button colorScheme='teal'  width='100%' onClick={() => sendData()} >Submit</Button>           
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>

    );
}
 
export default QuizCard;