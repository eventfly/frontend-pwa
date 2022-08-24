import {Stack, RadioGroup, Radio, Checkbox, Avatar, Box, Text, Spacer, Button} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'

const QuizCard = ({post}) => {
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
                                <div key={i}>
                                {/* { console.log(`outer ${index}`)} */}

                                    <Box fontSize='1.2rem' padding='1%' backgroundColor='teal' color='white' borderRadius='0.7%'>
                                        {question.question}
                                    </Box>
                                    
                                    <RadioGroup>
                                        <Stack padding='1%' backgroundColor='white' color='#464644' borderRadius='0.7%'>
                                        {   
                                            question.answers.map(
                                                (answer, j) => (
                                                <div key={j}>
                                                    {/* { console.log(`    inner ${index}`)} */}

                                                <Radio>
                                                    {answer.answer}
                                                </Radio>
                                                </div>
                                                )
                                            )
                                        }                   
                                        </Stack>
                                    </RadioGroup>                        
                                </div>
                            )
                        )
                    }
                    <Button colorScheme='teal'  width='100%'>Submit</Button>           
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>

    );
}
 
export default QuizCard;