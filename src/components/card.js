import React from 'react';
import {Box, Stack, Text} from '@chakra-ui/layout';

const Card = ({children}) => {
    return (
        <Stack borderRadius='lg' boxShadow='md' mb='6'>
            {children}
        </Stack>
    );
};

const CardHeading = ({children}) => {
    return (
        <Stack borderBottom='1px' borderColor='gray.200'>
            <Text fontSize='2xl' fontWeight='semibold' pb='2' pl='4' pt='2'>{children}</Text>
        </Stack>
    );
};

const CardBody = ({children}) => {
    return (<Box p='4' spacing='3'>{children}</Box>);
};

export {Card, CardHeading, CardBody};