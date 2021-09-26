import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useHistory} from 'react-router';
import {Spinner, Container, Image, Center, Box, Text, VStack, Button, Stack} from "@chakra-ui/react"
import {FcGoogle} from 'react-icons/fc';
import {FaFacebook} from 'react-icons/fa';

import {auth} from '../firebase';
import Logo from '../media/logo.png'
import {signInWithGoogle} from '../utils/auth-providers';

const LoginPage = () => {
    const history = useHistory();
    const [user, loading] = useAuthState(auth);

    if (user) {
        history.push('/')
    }

    if (loading) {
        <Spinner />
    }

    return (
        <Container>
            <Center>
                <VStack>
                    <Box pt='4'>
                        <Image src={Logo} boxSize='7.5em' />
                    </Box>
                    <Text fontSize='4xl'>{'Grocery List'}</Text>
                </VStack>
            </Center>
            <Box my={4} textAlign="left" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" p='8'>
                <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>

                    <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />} onClick={signInWithGoogle}>
                        <Center>
                            <Text>Sign in with Google</Text>
                        </Center>
                    </Button>
                    <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
                        <Center>
                            <Text>Continue with Facebook</Text>
                        </Center>
                    </Button>
                </Stack>
            </Box>
        </Container>
    )
}

export {LoginPage}