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
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700')
        }}
        onClick={onClick}
        px={2}
        py={1}
        rounded='md'>
        {children}
    </Link>
);

const Navigation = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const history = useHistory();
    const [user, loading] = useAuthState(auth);
    const color = useColorModeValue('gray.100', 'gray.900');

    const navigateTo = (url) => () => {
        history.push(url);
    };

    if (!user || loading) {
        return <></>;
    }

    const {photoURL} = user;
    return (
        <>
            <Box bg={color} px={4}>
                <Flex alignItems='center' h={16} justifyContent='space-between'>
                    <IconButton
                        aria-label='Open Menu'
                        display={{md: 'none'}}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        onClick={isOpen ? onClose : onOpen}
                        size='md'
                    />
                    <HStack alignItems='center' spacing={8}>
                        <Box><Image boxSize='45px' src={Logo} /></Box>
                        <HStack
                            as='nav'
                            display={{base: 'none', md: 'flex'}}
                            spacing={4}>

                            <NavLink onClick={navigateTo('/')}>{'List'}</NavLink>
                        </HStack>
                    </HStack>
                    <Flex alignItems='center'>
                        <Menu>
                            <MenuButton
                                as={Button}
                                cursor='pointer'
                                minW={0}
                                rounded='full'
                                variant='link'>
                                <Avatar
                                    size='sm'
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
                    <Box display={{md: 'none'}} pb={4}>
                        <Stack as='nav' spacing={4}>
                            <NavLink onClick={navigateTo('/')}>{'List'}</NavLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
};

export {Navigation};