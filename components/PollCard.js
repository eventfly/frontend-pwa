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
                    <Stack padding='1%' color='black'>
                        {
                            post.poll_options.map(
                                (options,i) => (
                                <div key={i}>
                                    <Checkbox>
                                        {options.option}
                                    </Checkbox>
                                </div>
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



   