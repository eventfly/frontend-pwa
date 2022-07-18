import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import EventCard from "../components/EventCard";
import FormTitle from "../components/Form/FormTitle";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Flex, Stack, Center, Box, useColorModeValue, Heading } from "@chakra-ui/react";

export async function getServerSideProps() {
  let isAuth = null;

  // if(!isAuth){

  //     return {
  //         redirect: {
  //             destination: '/login',
  //             permanent: false,
  //         },
  //     }
  // }

  return {
    props: {},
  };
}

export default function Home() {
  const router = useRouter();

  let events = [
    {
      id: 1,
      image: "event1.jpg",
      title: "Chicago Art Exhibition 2022",
      date: "Dec 12,2021",
      url: "1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },

    {
      id: 2,
      image: "event2.jpg",
      title: "Chicago Art Exhibition 2022",
      date: "Dec 12,2021",
      url: "2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  // useEffect(()=>{
  //     let isAuth = localStorage.getItem('user')

  //     if (!isAuth) {
  //       router.push("/login")
  //     }
  // });

  return (
    <Center py={6}>
      <Box
        maxW={"90%"}
        w={"full"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box p={0.1}>
          <Stack spacing={0} align={"center"}>
            <Heading fontSize={"3xl"} fontWeight={600} fontFamily={"body"}>
              Newsfeed
            </Heading>
          </Stack>

          <Center px={10}>
            <Box
              maxW="md"
              w={"full"}
              rounded={"md"}
              overflow={"hidden"}
            >

            <Stack spacing={0} align={'center'}>
              <EventCard event={events[0]} />
              <EventCard event={events[1]} />
            </Stack>
            </Box>
          </Center>

        </Box>
      </Box>
    </Center>
  );
}
