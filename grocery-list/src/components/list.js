import React, {useContext} from 'react';
import {UserContext} from '../contexts/user';

import {useGroceryList} from '../hooks/grocery-list-hooks';
import {groupItemsByCategory} from '../utils/category';

import {Category} from './category';
import {Loading} from './loading';


const List = () => {
    const userId = useContext(UserContext)
    const [items, loading] = useGroceryList(userId);

    if (loading) {
        return (
            <Loading />
        )
    }

    const categories = groupItemsByCategory(items);

    return (
        <>
            {categories.map(({name, items}) => <Category key={name} name={name} items={items} />)}
        </>
    )
}

export {List}