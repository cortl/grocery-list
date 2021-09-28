import {useEffect, useState} from 'react';
import {collection, where, query, addDoc, deleteDoc, doc, getDoc, setDoc, onSnapshot} from 'firebase/firestore'

import {firestore} from '../firebase';
import {meshAssociations} from '../utils/mesh';

const useGroceryList = (userId) => {
    const [items, setItems] = useState([])
    const [associations, setAssociations] = useState([])
    const [result, setResult] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(true);
    const [associationsLoading, setAssociationsLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(firestore, 'items'), where("userId", "==", userId));

        const unsub = onSnapshot(q, querySnap => {
            const fetched = []
            querySnap.forEach(doc => {
                fetched.push({itemId: doc.id, ...doc.data()})
            });
            setItems(fetched)
            setItemsLoading(false);
        });

        return unsub;

    }, [userId])

    useEffect(() => {
        const q = query(collection(firestore, 'associations'), where("userId", "==", userId));

        const unsub = onSnapshot(q, querySnap => {
            const fetched = []
            querySnap.forEach(doc => {
                fetched.push({categoryId: doc.id, ...doc.data()})
            })

            setAssociations(fetched)
            setAssociationsLoading(false);
        });

        return unsub;

    }, [userId])

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

const useActions = (userId, itemId, categoryId) => {
    const removeItem = async () => {
        await deleteDoc(doc(firestore, 'items', itemId))
    }
    const changeCategory = async (newCategory) => {
        if (categoryId) {
            await setDoc(doc(firestore, 'associations', categoryId), {
                category: newCategory
            }, {merge: true})
        } else {
            const existingItem = (await getDoc(doc(firestore, 'items', itemId))).data()
            await addDoc(collection(firestore, 'associations'), {
                category: newCategory,
                userId,
                name: existingItem.name
            })
        }
    }


    return [removeItem, changeCategory]
}

export {useGroceryList, useAddItem, useActions}