import {
    Flex,
    Image,
    Heading,
    Link,
    Box,
    Text,
    VStack,
    HStack,
    Container,
    Avatar,
    Button,
    chakra, 
    Spacer,
    Stack,
    Center
} from "@chakra-ui/react";
import {getData_Local, storeData_Local} from '../../services/StorageService';
import { getData } from '../../services/HttpService';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CONFIG from "../../config/config.json";

function SingleCommentView(props)
{
    const comment = props.comment;
    const creatorId = comment.creator.id;
    const name = comment.creator.id.name;
    const avatar = comment.creator.id.avatar;
    const router = useRouter();
    const [ loaded, setLoaded ] = useState(false);
    const [comments, setComments] = useState('');
    const date = new Date(comment.created_at).toDateString();


    useEffect(() => {

        console.log('New comment : ', comment);
        console.log('comment creator: ', comment.creator.id.name);

 			
		
	});


    return (
			<>  
                
                                        
                <Flex padding='1%'>
                    <Avatar src={avatar} />
                    <Spacer />
                    <Box ml='3' width='100%' backgroundColor='white' borderRadius='10px' overflow='hidden' direction = "column">
                            
                            <Text width='100%' paddingLeft='1.5%' paddingBottom='1.5%' fontWeight='bold'>
                                {name} 
                            </Text>
                            <Text width='100%' height='auto' maxHeight='150px' padding='3%' textAlign='justify'
                                sx={
                                    { 
                                    '::-webkit-scrollbar':{
                                        display:'none'
                                    }
                                    }
                                } 
                                overflow='hidden' overflowY='scroll'
                            >
                                {comment.content}
                            </Text>
                    </Box>
                    
                        
                </Flex>
                <Flex justifyContent='flex-end'>
                    <Stack direction='row'>
                        <Center>
                            <Text fontSize='xs' id='datePlace' >
                                {date}
                            </Text>
                        </Center>
                        
                    </Stack>
                </Flex>

            
            </>
	
                
     
    )
}


export default SingleCommentView;