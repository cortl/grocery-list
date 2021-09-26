import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useHistory} from 'react-router-dom';
import {Navigation} from '../components/navigation';

import {auth} from '../firebase';

const GroceryPage = () => {
    const history = useHistory();
    const [user] = useAuthState(auth);

    if (!user) {
        history.push('/login')
    }

    return (
        <>
            <Navigation />
            <h1>{'Grocery Page'}</h1>
        </>
    )
}

export {GroceryPage}