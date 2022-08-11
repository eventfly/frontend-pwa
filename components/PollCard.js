import styles from '../styles/PollCard.module.css'
import Link from 'next/link'
import {Card} from 'react-bootstrap';
import {Stack, Checkbox, Avatar, Box, Text, Spacer, Button} from "@chakra-ui/react";

const PollCard = ({poll}) => {
    return ( 

        <>

                <Card className={"bg-dark text-white " + styles.postCard}> 
                <Box className={styles.pollQuestion}>
                    {poll.question}
                </Box>

                {/* <Card.Img src={poll.image} alt="Card image" className={styles.postBanner} /> */}

                <Stack className={styles.pollOptionsContainer}>
                    {
                        poll.options.map(
                            (option) => (
                            <Checkbox>
                                {option}
                            </Checkbox>
                            )
                        )
                    }                   
                </Stack>
             </Card> 
        </>

    );
}
 
export default PollCard;