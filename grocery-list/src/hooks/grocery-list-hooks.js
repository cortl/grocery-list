import {useEffect, useState} from 'react';
import {collection, where, query, addDoc, deleteDoc, doc, getDoc, setDoc, onSnapshot} from 'firebase/firestore'

import {firestore} from '../firebase';
import {meshAssociations} from '../utils/mesh';
import {getDocumentsFromCollectionOnce, getDocumentsFromQuerySnap} from '../utils/query';

const getIdsFromShares = async (userId) => {
    const [otherShares, myShares] = await Promise.all([
        getDocumentsFromCollectionOnce('shares', where('requestedId', '==', userId)),
        getDocumentsFromCollectionOnce('shares', where('senderId', '==', userId))
    ])

    const shares = [
        ...otherShares.map(doc => doc.senderId),
        ...myShares.map(doc => doc.requestedId).filter(Boolean),
        userId
    ];

    return shares;
}

const useGroceryList = (userId) => {
    const [items, setItems] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(true);

    const [associations, setAssociations] = useState([])
    const [associationsLoading, setAssociationsLoading] = useState(true);

    const [result, setResult] = useState([]);

    const [ids, setIds] = useState([]);

    useEffect(() => {
        let unsub = () => { };

        if (ids.length) {
            const q = query(collection(firestore, 'items'), where("userId", "in", ids));

            unsub = onSnapshot(q, querySnap => {
                const fetched = getDocumentsFromQuerySnap(querySnap);

                setItems(fetched)
                setItemsLoading(false);
            });
        }

        return unsub;

    }, [ids])

    useEffect(() => {
        const getIds = async () => {
            const results = await getIdsFromShares(userId);
            setIds(results)
        }
        getIds();
    }, [userId])

    useEffect(() => {
        const q = query(collection(firestore, 'associations'), where("userId", "==", userId));

        const unsub = onSnapshot(q, querySnap => {
            const fetched = getDocumentsFromQuerySnap(querySnap);

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