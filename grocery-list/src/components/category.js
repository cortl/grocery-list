import React from 'react';
import {List} from '@chakra-ui/react';

import {Item} from './item';
import {Card, CardBody, CardHeading} from './card';

import {CATEGORIES} from '../constants/categories';

const Category = ({name, items}) => {
    return (
        <Card>
            <CardHeading>{name}{' '}{CATEGORIES[name].symbol}</CardHeading>

            <CardBody>
                <List>
                    {items.map((item, i) => <Item key={`${item.name}${i}`} item={item} />)}
                </List>
            </CardBody>
        </Card>
    );
}

export {Category}