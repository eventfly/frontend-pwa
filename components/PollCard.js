import styles from '../styles/PollCard.module.css'
import Link from 'next/link'
import {Card} from 'react-bootstrap';
import {Stack, Checkbox, Avatar, Box, Text, Spacer, Button} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'

const PollCard = ({poll}) => {
    return ( 

        <>

            <Card className={"bg-dark text-white " + styles.pollCard}> 
                <Popover>
                    <Stack direction='column'>
                       <Box className={styles.pollQuestion}>
                            {poll.question}
                        </Box>
                        <PopoverTrigger>
                            <Button colorScheme='teal' variant='ghost'>Vote!</Button>
                        </PopoverTrigger> 
                    </Stack>
                    
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader backgroundColor='teal'>{poll.question}</PopoverHeader>
                        <PopoverBody>
                        <Stack className={styles.pollOptionsContainer}>
                            {
                                poll.options.map(
                                    (option) => (
                                        <>
                                    <Checkbox>
                                        {option}
                                    </Checkbox>
                                    </>
                                    )
                                )
                            }                   
                        </Stack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                {/* <Box className={styles.pollQuestion}>
                    {poll.question}
                </Box>
                <Stack className={styles.pollOptionsContainer}>
                    {
                        poll.options.map(
                            (option) => (
                                <>
                            <Checkbox>
                                {option}
                            </Checkbox>
                            </>
                            )
                        )
                    }                   
                </Stack> */}
             </Card> 
        </>

    );
}
 
export default PollCard;