import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';
import {Container, Heading} from '@chakra-ui/react';

import {Navigation} from '../components/navigation';
import {List} from '../components/list';
import {AddItem} from '../components/add';

import {auth} from '../firebase';
import {UserContext} from '../contexts/user';

const GroceryPage = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    React.useEffect(() => {
        if (!user?.uid) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user?.uid) {
        return (<></>);
    }

    return (
        <>
            <Navigation />
            <UserContext.Provider value={user.uid}>
                <Container maxW='container.md'>
                    <Heading pb='4' pt='4'>{'Grocery List'}</Heading>
                    <List />
                    <AddItem />
                </Container>
            </UserContext.Provider>
        </>
    );
};

export {GroceryPage};