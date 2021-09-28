import {CATEGORIES} from '../constants/categories';

const sortCategory = (catA, catB) => CATEGORIES[catA].sortOrder - CATEGORIES[catB].sortOrder;
const sortAlphabetically = (itemA, itemB) => itemA.name.localeCompare(itemB.name);
const groupItemsByCategory = (items) => [...new Set(items.map(item => item.category))]
    .sort(sortCategory)
    .reduce((acc, category) => {
        const itemsInCategory = items.filter(item => item.category === category).sort(sortAlphabetically)

        return [...acc, {
            name: category,
            items: itemsInCategory.sort()
        }]
    }, []);

export {groupItemsByCategory}