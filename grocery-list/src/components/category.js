import React from 'react';
import {Stack, Text, List} from '@chakra-ui/react';

import {Item} from './item';

import {CATEGORIES} from '../constants/categories';

const Category = ({name, items}) => {
    return (
        <Stack boxShadow="md" mb='6' borderRadius="lg">
            <Stack borderBottom={'1px'} borderColor={'gray.200'}>
                <Text pl='4' pt='2' pb='2' fontWeight="semibold" fontSize='2xl'>{name}{' '}{CATEGORIES[name].symbol}</Text>
            </Stack >

            <List p='4' spacing='3'>
                {items.map((item, i) => <Item key={`${item.name}${i}`} item={item} />)}
            </List>
        </Stack >
    )
}

export {Category}