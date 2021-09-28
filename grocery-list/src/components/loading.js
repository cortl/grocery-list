import React from 'react';
import {Center, Container} from '@chakra-ui/layout';
import {Spinner} from '@chakra-ui/spinner';

const Loading = () => (
    <Container>
        <Center>
            <Spinner pt='8' />
        </Center>
    </Container>
)

export {Loading}