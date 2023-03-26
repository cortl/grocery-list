import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Image,
  Center,
  Box,
  Text,
  VStack,
  Button,
  Stack
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

import { auth } from '../firebase';
import Logo from '../media/logo.png';
import { signInWithGoogle } from '../utils/auth-providers';
import { Loading } from '../components/loading';

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user) {
    return <></>;
  }

  if (loading) {
    <Loading />;
  }

  return (
    <Container>
      <Center>
        <VStack>
          <Box pt='4'>
            <Image boxSize='7.5em' src={Logo} />
          </Box>
          <Text fontSize='4xl'>{'Grocery List'}</Text>
        </VStack>
      </Center>
      <Box
        borderRadius={8}
        borderWidth={1}
        boxShadow='lg'
        maxWidth='500px'
        my={4}
        p='8'
        textAlign='left'
      >
        <Stack align='center' maxW='md' spacing={2} w='full'>
          <Button
            leftIcon={<FcGoogle />}
            onClick={signInWithGoogle}
            variant='outline'
            w='full'
          >
            <Center>
              <Text>{'Sign in with Google'}</Text>
            </Center>
          </Button>
          <Button colorScheme='facebook' leftIcon={<FaFacebook />} w='full'>
            <Center>
              <Text>{'Continue with Facebook'}</Text>
            </Center>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export { LoginPage };
