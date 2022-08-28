import {Stack, Checkbox, Avatar, Box, Text, Spacer,Flex, Button} from "@chakra-ui/react";
import {
    Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,
    PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'
  import {getData_Local, storeData_Local} from '../../services/StorageService';
  import { putData } from '../../services/HttpService';
import {useState, useEffect} from 'react';
import CONFIG from "../../config/config.json";

function PollCard (props)
{
    const post = props.post;
    const postId = post._id;
    const [pollOptions, setPollOptions] = useState([]);
    const size = post.poll_options.length;
    const [pollCreated,setPollCreated] = useState(false);

    function handleOptionSelected(event, index)
    {
        console.log("inside handle select")
        console.log("i:", index)
        console.log("handle e poll call: ", pollOptions);

        if (pollOptions[index].is_selected){
            var temp = pollOptions;
            temp[index].is_selected = false;
            setPollOptions(temp);
        }
        else{
            var temp = pollOptions;
            temp[index].is_selected = true;
            setPollOptions(temp);
        }

        console.log("Poll Options:",pollOptions);
    }

    function sendData()
    {
        console.log("inside sendData")

        console.log("----------------------pollOptions--")
        console.log(pollOptions);


        const userID = getData_Local("userId"); 

        const pollUrl = `${CONFIG.BASE_URL.NEWSFEED}/api/newsfeed/post/${postId}/answer`;
        const payload = {
            poll_answers: pollOptions
        }
        console.log("payload--")
        console.log(payload)

        putData(pollUrl, payload)
        .then((data) => {
            console.log("Response data:", data);
        }).catch((err) => {
            console.log("error");
        });
    }

    useEffect(() => {
        if(!pollCreated){
            var temp = []
            for( var i = 0; i < size; i++){
                temp.push({
                    "index": i,
                    "is_selected": false
                });
            }
            setPollOptions(temp);
            setPollCreated(true);
        }
       
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



   