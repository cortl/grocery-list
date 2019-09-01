import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import GroceryList from './GroceryList';
import SignIn from './security/SignIn';
import requireAuth from '../enhancers/requireAuth';

const App = () => (
    <BrowserRouter>
        <>
            <Route component={requireAuth(GroceryList)} exact path='/'/>
            <Route component={SignIn} exact path='/login'/>
        </>
    </BrowserRouter>
);

export default App;
