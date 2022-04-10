import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Container, Heading } from '@chakra-ui/react';

import { Navigation } from '../components/navigation';
import { auth } from '../firebase';
import { UserContext } from '../contexts/user';
import { Statistics } from '../components/stats';
import { Sharing } from '../components/sharing';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  console.log(user);

  if (!user) {
    navigate('/login');

    return <></>;
  }

  return (
    <>
      <Navigation />
      <UserContext.Provider value={user.uid}>
        <Container maxW='container.md'>
          <Heading pb='4' pt='4'>
            {'Settings'}
          </Heading>
          <Statistics />
          <Sharing />
        </Container>
      </UserContext.Provider>
    </>
  );
};

export { SettingsPage };
