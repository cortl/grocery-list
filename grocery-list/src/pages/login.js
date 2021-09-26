import React from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useHistory} from 'react-router';

import {auth} from '../firebase';
import {signInWithGoogle} from '../utils/auth-providers';

const LoginPage = () => {
    const history = useHistory();
    const [user] = useAuthState(auth);

    if (user) {
        history.push('/')
    }

    return (
        <>
            <h1>{'Login Page'}</h1>
            <div>
                <ul>
                    <li>
                        <button onClick={signInWithGoogle}>{'Sign in with Google'}</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export {LoginPage}