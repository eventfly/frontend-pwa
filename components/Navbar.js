import React, { ReactNode } from 'react';
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	Icon,
	useColorModeValue,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	HStack,
	Menu,
	MenuButton,
	VStack,
	MenuList,
	MenuItem,
	Avatar,
	Image
} from '@chakra-ui/react';

import {
	FiInfo,
	FiMenu,
	FiLock,
	FiEyeOff,
	FiSearch,
	FiChevronDown,
	FiSettings,
	FiUser,
	FiSmartphone,
	FiBox,
	FiCalendar
} from 'react-icons/fi';

import Link from "next/link";
import { getData_Local } from "../services/StorageService";
import CONFIG from "../config/config.json";


const LinkItems = [
	{
		name: "Home",
		link: "/",
		icon: FiLock
	},
	{
		name: "My Events",
		link: "/my-events",
		icon: FiCalendar
	},
	{
		name: "Ticket",
		link: "/ticket",
		icon: FiSmartphone
	},
	{
		name: "Orders",
		link: "/order",
		icon: FiBox
	},
	{
		name: "Search",
		link: "/search",
		icon: FiSearch
	},
	{
		name: "Profile",
		link: "/profile",
		icon: FiUser
	},
	{
		name: "Settings",
		link: "/settings",
		icon: FiSettings
	},
	{
		name: "Signout",
		link: "/signout",
		icon: FiEyeOff
	},
];

function Navbar({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full">
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="0">
				{children}
			</Box>
		</Box>
	);
};


const SidebarContent = ({ onClose, ...rest }) => {

	const userName = getData_Local("userName");
	const userEmail = getData_Local("userEmail");

	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="3xl" fontWeight="bold">
					EventFly
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			<Flex direction="column" marginBottom="10" alignItems="left" mx="8">
				<Text fontSize="lg" fontWeight="bold">
					{userName}
				</Text>
				<Text fontSize="md">
					{userEmail}
				</Text>
			</Flex>
			{
				LinkItems.map((each) => (
					<NavItem key={each.name} icon={each.icon}>
						<Link href={each.link} as={each.link}>
							<Text fontSize={"md"}>
								{each.name}
							</Text>
						</Link>
					</NavItem>
				))
			}
		</Box>
	);
};


const NavItem = ({ icon, children, ...rest }) => {
	return (
		<Link href="" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="md"
				role="group"
				cursor="pointer"
				_hover={{
					bg: 'green.500',
					color: 'white',
				}}
				{...rest}>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'white',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};


const MobileNav = ({ onOpen, ...rest }) => {

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Box>
				<Image
					src={CONFIG.LOGO}
					maxW={"32"}
					w={"32"}
				/>
			</Box>

		</Flex>
	);
};

export default Navbar;