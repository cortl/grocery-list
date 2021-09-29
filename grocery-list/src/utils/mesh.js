const byName = (item) => (association) => association.name.toUpperCase() === item.name.toUpperCase()
const meshAssociations = (items, associations) => {
    const mappedItems = items.map(item => {
        const association = associations.find(byName(item))

        const mappedItem = association
            ? {
                itemId: item.itemId,
                name: item.name,
                category: association.category,
                categoryId: association.id
            }
            : {
                itemId: item.itemId,
                name: item.name,
                category: 'None'
            }

        return mappedItem;

    })
    return mappedItems
}

export {meshAssociations}