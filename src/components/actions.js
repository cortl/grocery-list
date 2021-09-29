import React, {useContext} from 'react';
import {IconButton, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react';
import {FiTrash, FiTag} from 'react-icons/fi';

import {CATEGORIES} from '../constants/categories';
import {ItemContext} from '../contexts/item';
import {useActions} from '../hooks/grocery-list-hooks';
import {UserContext} from '../contexts/user';

const Actions = () => {
    const userId = useContext(UserContext);
    const {itemId, categoryId} = useContext(ItemContext);
    const [removeItem, changeCategory] = useActions(userId, itemId, categoryId);

    const changeCategoryFactory = (category) => () => changeCategory(category);

    return (
        <>
            <Menu>
                <MenuButton aria-label='Categorize item' as={IconButton} icon={<FiTag />} mr='2' />
                <MenuList>
                    {Object.keys(CATEGORIES).map(name => {
                        const category = CATEGORIES[name];
                        return (
                            <MenuItem key={name} onClick={changeCategoryFactory(name)}>
                                {name}
                                {` ${category.symbol}`}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
            <IconButton aria-label='Delete item' icon={<FiTrash />} onClick={removeItem} />
        </>
    );
};

export {Actions};