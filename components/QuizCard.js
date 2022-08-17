import styles from '../styles/QuizCard.module.css'
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
                            (question, index) => (
                                <>
                                {/* { console.log(`outer ${index}`)} */}

                                    <Box className={styles.quizQuestion}>
                                        {question.question}
                                    </Box>
                                    
                                    <RadioGroup>
                                        <Stack className={styles.quizOptionsContainer}>
                                        {   
                                            question.answers.map(
                                                (answer, index) => (
                                                <>
                                                    {/* { console.log(`    inner ${index}`)} */}

                                                <Radio>
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
                    <Button colorScheme='teal'  width='100%'>Submit</Button>           
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>

    );
}
 
export default QuizCard;