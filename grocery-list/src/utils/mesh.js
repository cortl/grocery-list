const hasNumber = string => {
    return /\d/.test(string);
};

const itemStripper = name => {
    return name.split(' ')
        .filter((item) => !hasNumber(item))
        .filter((item) => item.length !== 1)
        .map((item) => item.replace(/[^a-zA-Z]/gi, ''))
        .join(' ').toUpperCase();
};

const byName = (item) => (association) => itemStripper(association.name) === itemStripper(item.name)
const meshAssociations = (items, associations) => {
    const mappedItems = items.map(item => {
        const association = associations.find(byName(item))

        const mappedItem = association
            ? {
                itemId: item.id,
                name: item.name,
                category: association.category,
                categoryId: association.id
            }
            : {
                itemId: item.id,
                name: item.name,
                category: 'None'
            }

        return mappedItem;

    })
    return mappedItems
}

export {meshAssociations}