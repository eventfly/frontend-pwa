import {Stack, RadioGroup, Radio, Checkbox, Avatar, Box, Flex, Text, Spacer, Button} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'
import { postData } from '../services/HttpService';  
import {getData_Local, storeData_Local} from '../services/StorageService';
import {useState, useEffect} from 'react';


const QuizCard = ({post}) => {
    var quizAnswers = [];
    const size = post.questions.length;

    function handleQuizAnswers(event, index1, index2)
    {
        console.log("inside handle Answer")
        console.log("i:", index1)
        console.log("j:", index2)
        
        quizAnswers[index1].answer_index = index2;

        console.log("quiz Answers:");
        console.table(quizAnswers);
    }

    function sendData()
    {
        console.log("inside sendData")

        console.log("quizAnswers--")
        console.log(quizAnswers);


        const userID = getData_Local("userId"); 

        const quizUrl = '';
        const payload = {
            postID: post._id,
            userID: userID,
            answer_index: quizAnswers
        }
        console.log("payload--")
        console.log(payload)

        postData(quizUrl, payload)
        .then((data) => {
            console.log("Response data:", data);
            storeData_Local("token", data.token);
        }).catch((err) => {
            console.log("error");
        });
    }

    useEffect(() => {
        for( var i = 0; i < size; i++){
            quizAnswers.push({
                "answer_index": 0,
                "time": new Date().toUTCString
            });
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