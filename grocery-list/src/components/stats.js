import {Text} from '@chakra-ui/layout';
import React, {useContext} from 'react';

import {UserContext} from '../contexts/user';
import {useStatistics} from '../hooks/settings-hooks';
import {CardHeading, Card, CardBody} from './card';
import {Loading} from './loading';

const Statistics = () => {
    const userId = useContext(UserContext);
    const [totalItemsAdded, loading] = useStatistics(userId);

    if (loading) {
        return <Loading />
    }

    return (
        <Card>
            <CardHeading>{'Your statistics'}</CardHeading>
            <CardBody>
                <Text>{'Total number of items added 🐱‍👤'}</Text>
                <Text>{totalItemsAdded}</Text>
            </CardBody>
        </Card>
    )
}

export {Statistics}