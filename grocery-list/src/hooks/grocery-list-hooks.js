import {useEffect, useState} from 'react';
import {collection, where, query, getDocs, addDoc} from 'firebase/firestore'

import {firestore} from '../firebase';
import {meshAssociations} from '../utils/mesh';

const useGroceryList = (userId) => {
    const [items, setItems] = useState([])
    const [associations, setAssociations] = useState([])
    const [result, setResult] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(true);
    const [associationsLoading, setAssociationsLoading] = useState(true);

    useEffect(async () => {
        const q = query(collection(firestore, 'items'), where("userId", "==", userId));

        const querySnap = await getDocs(q);

        const fetched = []
        querySnap.forEach(doc => {
            fetched.push({itemId: doc.id, ...doc.data()})
        })

        setItems(fetched)
        setItemsLoading(false);
    }, []);


    useEffect(async () => {
        const q = query(collection(firestore, 'associations'), where("userId", "==", userId));

        const querySnap = await getDocs(q);

        const fetched = []
        querySnap.forEach(doc => {
            fetched.push({categoryId: doc.id, ...doc.data()})
        })

        setAssociations(fetched)
        setAssociationsLoading(false);
    }, []);

    useEffect(() => {
        const result = meshAssociations(items, associations)
        setResult(result)
    }, [items, associations])

    return [result, itemsLoading || associationsLoading]
}

const useAddItem = (userId) => {
    const [loading, setLoading] = useState(false);

    const addItem = async (name) => {
        setLoading(true);
        await addDoc(collection(firestore, 'items'), {
            name,
            userId
        })
        setLoading(false);
    }

    return [loading, addItem]
}

export {useGroceryList, useAddItem}