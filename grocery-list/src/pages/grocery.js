import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useHistory} from 'react-router-dom';

import {auth} from '../firebase';

const GroceryPage = () => {
    const history = useHistory();
    const [user, loading, error] = useAuthState(auth);

    if (!user) {
        history.push('/login')
    }

    return (
        <h1>{'Grocery Page'}</h1>
    )
}

export {GroceryPage}