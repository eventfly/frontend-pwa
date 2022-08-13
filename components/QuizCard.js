import styles from '../styles/QuizCard.module.css'
import Link from 'next/link'
import {Card} from 'react-bootstrap';
import {Stack, RadioGroup, Radio, Checkbox, Avatar, Box, Text, Spacer, Button} from "@chakra-ui/react";

const QuizCard = ({quiz}) => {
    return ( 

        <>

            <Card className={"bg-dark text-white " + styles.quizCard}>

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
            
                
                
            </Card> 
        </>

    );
}
 
export default QuizCard;