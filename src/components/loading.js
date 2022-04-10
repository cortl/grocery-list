import React from 'react';
import {Center, Container, Spinner} from '@chakra-ui/react';

const Loading = () => (
    <Container>
        <Center>
            <Spinner m='8' />
        </Center>
    </Container>
);

export {Loading};