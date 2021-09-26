import React from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image
} from '@chakra-ui/react';
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons';
import {useAuthState} from 'react-firebase-hooks/auth';

import {auth} from '../firebase';
import Logo from '../media/logo.png';
import {signOut} from '../utils/auth-providers';
import {useHistory} from 'react-router-dom';

const NavLink = ({onClick, children}) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        onClick={onClick}>
        {children}
    </Link>
);

const Navigation = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const history = useHistory();
    const [user, loading, error] = useAuthState(auth);
    const color = useColorModeValue('gray.100', 'gray.900');

    const navigateTo = (url) => () => {
        history.push(url);
    }

    if (loading) {
        return <h1>{'Loading'}</h1>
    }

    const {photoURL} = user;
    return (
        <>
            <Box bg={color} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{md: 'none'}}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><Image src={Logo} boxSize="45px" /></Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{base: 'none', md: 'flex'}}>

                            <NavLink onClick={navigateTo('/')}>{'List'}</NavLink>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={photoURL}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={navigateTo('/settings')}>{'Settings'}</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={signOut}>{'Sign out'}</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{md: 'none'}}>
                        <Stack as={'nav'} spacing={4}>
                            <NavLink onClick={navigateTo('/')}>{'List'}</NavLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

export {Navigation}