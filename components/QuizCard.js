import styles from '../styles/QuizCard.module.css'
import Link from 'next/link'
import {Card} from 'react-bootstrap';
import {Stack, RadioGroup, Radio, Checkbox, Avatar, Box, Text, Spacer, Button} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'

const QuizCard = ({quiz}) => {
    return ( 

        <>

            <Card className={"bg-dark text-white " + styles.quizCard}>

                <Popover>
                    <Stack direction='column'>
                       <Box fontSize="x-large" paddingLeft='1%'>
                            Take the quiz!!!
                        </Box>
                        <PopoverTrigger>
                            <Button colorScheme='teal' variant='ghost'>Vote!</Button>
                        </PopoverTrigger> 
                    </Stack>
                    
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader backgroundColor='teal'>Quiz!</PopoverHeader>
                        <PopoverBody>
                        {
                            quiz.questions.map(
                                (question, index) => (
                                    <>
                                    {/* { console.log(`outer ${index}`)} */}

                                        <Box className={styles.quizQuestion}>
                                            {question.question}
                                        </Box>
                                        
                                        <RadioGroup>
                                            <Stack className={styles.quizOptionsContainer}>
                                            {   
                                                question.options.map(
                                                    (option, index) => (
                                                    <>
                                                        {/* { console.log(`    inner ${index}`)} */}

                                                    <Radio>
                                                        {option}
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

                {/* {
                    quiz.questions.map(
                        (question, index) => (
                            <>
                               

                                <Box className={styles.quizQuestion}>
                                    {question.question}
                                </Box>
                                
                                <RadioGroup>
                                    <Stack className={styles.quizOptionsContainer}>
                                    {   
                                        question.options.map(
                                            (option, index) => (
                                            <>
                                                

                                            <Radio>
                                                {option}
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
                } */}
            
                
                
            </Card> 
        </>

    );
}
 
export default QuizCard;