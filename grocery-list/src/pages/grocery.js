import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useHistory} from 'react-router-dom';
import {Container, Heading} from "@chakra-ui/react"

import {Navigation} from '../components/navigation';
import {List} from '../components/list';
import {AddItem} from '../components/add-item';

import {auth} from '../firebase';

const GroceryPage = () => {
    const history = useHistory();
    const [user] = useAuthState(auth);

    if (!user?.uid) {
        history.push('/login')

        return (<></>)
    }

    return (
        <>
            <Navigation />
            <Container maxW="container.md">
                <Heading pt='4' pb='4'>{'Grocery List'}</Heading>
                <List userId={user.uid} />
                <AddItem userId={user.uid} />
            </Container>
        </>
    )
}

export {GroceryPage}