import styles from '../styles/PollCard.module.css'
import {Stack, Checkbox, Avatar, Box, Text, Spacer, Button} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'

const PollCard = ({post}) => {
    return ( 

        <>
            <Popover>
                <Stack direction='column'>
                    <PopoverTrigger>
                        <Button colorScheme='teal' variant='ghost'>Poll Voting!</Button>
                    </PopoverTrigger> 
                </Stack>
                
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                    <Stack className={styles.pollOptionsContainer}>
                        {
                            post.poll_options.map(
                                (options) => (
                                <>
                                <Checkbox>
                                    {options.option}
                                </Checkbox>
                                </>
                                )
                            )
                        }                   
                    </Stack>
                    <Button colorScheme='teal' width='100%'>Submit</Button>
                    </PopoverBody>
                </PopoverContent>
            </Popover> 

        </>

    );
}
 
export default PollCard;