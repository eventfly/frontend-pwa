import {
    chakra,
    Box,
    Flex,
    Link,
    Image
} from "@chakra-ui/react";


function SearchResultCardImageColumn() {

    return (
        <Flex
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={5}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                display={{
                    lg: "flex",
                }}
                maxW={{
                    lg: "xl",
                }}
                shadow={{
                    lg: "lg",
                }}
                rounded={{
                    lg: "lg",
                }}
            >
                <Box
                    w={{
                        lg: "50%",
                    }}
                >
                    <Box
                        h={{
                            base: 64,
                            lg: "full",
                        }}
                        rounded={{
                            lg: "lg",
                        }}
                        bgSize="cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
                        }}
                    ></Box>
                </Box>

                <Box
                    py={12}
                    px={6}
                    maxW={{
                        base: "xl",
                        lg: "5xl",
                    }}
                    w={{
                        lg: "50%",
                    }}
                >
                    <chakra.h2
                        fontSize={{
                            base: "2xl",
                            md: "3xl",
                        }}
                        color="gray.800"
                        _dark={{
                            color: "white",
                        }}
                        fontWeight="bold"
                    >
                        Build Your New{" "}
                        <chakra.span
                            color="brand.600"
                            _dark={{
                                color: "brand.400",
                            }}
                        >
                            Idea
                        </chakra.span>
                    </chakra.h2>
                    <chakra.p
                        mt={4}
                        color="gray.600"
                        _dark={{
                            color: "gray.400",
                        }}
                    >
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi
                        reprehenderit viconsequatur.
                    </chakra.p>

                    <Box mt={8}>
                        <Link
                            bg="gray.900"
                            color="gray.100"
                            px={5}
                            py={3}
                            fontWeight="semibold"
                            rounded="lg"
                            _hover={{
                                bg: "gray.800",
                            }}
                        >
                            Start Now
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}

function SearchResultCardImageRow() {
    return (
        <Flex
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={5}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                mx="auto"
                rounded="lg"
                shadow="md"
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                maxW="xl"
            >
                <Image
                    roundedTop="lg"
                    w="full"
                    h={64}
                    fit="cover"
                    src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="Article"
                />

                <Box p={6}>
                    <Box>
                        <chakra.span
                            fontSize="xs"
                            textTransform="uppercase"
                            color="brand.600"
                            _dark={{
                                color: "brand.400",
                            }}
                        >
                            Product
                        </chakra.span>
                        <Link
                            display="block"
                            color="gray.800"
                            _dark={{
                                color: "white",
                            }}
                            fontWeight="bold"
                            fontSize="2xl"
                            mt={2}
                            _hover={{
                                color: "gray.600",
                                textDecor: "underline",
                            }}
                        >
                            I Built A Successful Blog In One Year
                        </Link>
                        <chakra.p
                            mt={2}
                            fontSize="sm"
                            color="gray.600"
                            _dark={{
                                color: "gray.400",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
                            parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris
                            egestas quam volutpat viverra. In pretium nec senectus erat. Et
                            malesuada lobortis.
                        </chakra.p>
                    </Box>

                    <Box mt={4}>
                        <Flex alignItems="center">
                            <Flex alignItems="center">
                                <Image
                                    h={10}
                                    fit="cover"
                                    rounded="full"
                                    src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                                    alt="Avatar"
                                />
                                <Link
                                    mx={2}
                                    fontWeight="bold"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.200",
                                    }}
                                >
                                    Jone Doe
                                </Link>
                            </Flex>
                            <chakra.span
                                mx={1}
                                fontSize="sm"
                                color="gray.600"
                                _dark={{
                                    color: "gray.300",
                                }}
                            >
                                21 SEP 2015
                            </chakra.span>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}


function SearchResultCardBasic() {
    return (
        <Flex
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={5}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                mx="auto"
                px={8}
                py={4}
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                maxW="xl"
                shadow={{
                    lg: "lg",
                }}
                rounded={{
                    lg: "lg",
                }}
            >
                <Flex justifyContent="space-between" alignItems="center">
                    <chakra.span
                        fontSize="sm"
                        color="gray.600"
                        _dark={{
                            color: "gray.400",
                        }}
                    >
                        Mar 10, 2019
                    </chakra.span>
                    <Link
                        px={3}
                        py={1}
                        bg="gray.600"
                        color="gray.100"
                        fontSize="sm"
                        fontWeight="700"
                        rounded="md"
                        _hover={{
                            bg: "gray.500",
                        }}
                    >
                        Design
                    </Link>
                </Flex>

                <Box mt={2}>
                    <Link
                        fontSize="2xl"
                        color="gray.700"
                        _dark={{
                            color: "white",
                        }}
                        fontWeight="700"
                        _hover={{
                            color: "gray.600",
                            _dark: {
                                color: "gray.200",
                            },
                            textDecor: "underline",
                        }}
                    >
                        Accessibility tools for designers and developers
                    </Link>
                    <chakra.p
                        mt={2}
                        color="gray.600"
                        _dark={{
                            color: "gray.300",
                        }}
                    >
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
                        expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
                        enim reprehenderit nisi, accusamus delectus nihil quis facere in modi
                        ratione libero!
                    </chakra.p>
                </Box>

                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                    <Link
                        color="brand.600"
                        _dark={{
                            color: "brand.400",
                        }}
                        _hover={{
                            textDecor: "underline",
                        }}
                    >
                        Read more
                    </Link>

                    <Flex alignItems="center">
                        <Image
                            mx={4}
                            w={10}
                            h={10}
                            rounded="full"
                            fit="cover"
                            display={{
                                base: "none",
                                sm: "block",
                            }}
                            src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                            alt="avatar"
                        />
                        <Link
                            color="gray.700"
                            _dark={{
                                color: "gray.200",
                            }}
                            fontWeight="700"
                            cursor="pointer"
                        >
                            Khatab wedaa
                        </Link>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}

export {
    SearchResultCardBasic,
    SearchResultCardImageRow,
    SearchResultCardImageColumn
};