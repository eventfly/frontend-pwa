import {Stack, Checkbox, Avatar, Box, Text, Spacer,Flex, Button} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'
  import {getData_Local, storeData_Local} from '../../services/StorageService';
  import { postData } from '../../services/HttpService';
import {useState, useEffect} from 'react';

function PollCard (props)
{
    const post = props.post;
    var pollOptions = [];
    const size = post.poll_options.length;

    function handleOptionSelected(event, index)
    {
        console.log("inside handle select")
        console.log("i:", index)
        console.log("handle e poll call: ", pollOptions);

        if (pollOptions[index].is_selected)
            pollOptions[index].is_selected = false;
        else
            pollOptions[index].is_selected = true;

        console.log("Poll Options:");
        console.table(pollOptions);
    }

    function sendData()
    {
        console.log("inside sendData")

        console.log("pollOptions--")
        console.log(pollOptions);


        const userID = getData_Local("userId"); 

        const pollUrl = '';
        const payload = {
            post_id: post._id,
            user_id: userID,
            poll_options: pollOptions
        }
        console.log("payload--")
        console.log(payload)

        postData(pollUrl, payload)
        .then((data) => {
            console.log("Response data:", data);
        }).catch((err) => {
            console.log("error");
        });
    }

    useEffect(() => {
        for( var i = 0; i < size; i++){
            pollOptions.push({
                "index": i,
                "is_selected": false
            });
        }
        console.log('faka poll: ', pollOptions);
    }, []);

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
                                <>
                                    <Checkbox onChange={(e) => handleOptionSelected(e, i)}>
                                        {options.option}
                                    </Checkbox>
                                </>
                                )
                            )
                        }                   
                    </Stack>
                    <Button colorScheme='teal' width='100%' onClick={() => sendData()}>Submit</Button>
                    </PopoverBody>
                </PopoverContent>
            </Popover> 

        </>

    );
}
 
export default PollCard;



   