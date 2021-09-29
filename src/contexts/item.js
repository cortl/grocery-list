import React from 'react';

const defaultState = {
    itemId: '',
    categoryId: ''
};

const ItemContext = React.createContext(defaultState);

export {ItemContext};