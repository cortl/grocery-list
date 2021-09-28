import {useEffect, useState} from 'react';
import {collection, where, query, addDoc, deleteDoc, doc, getDoc, setDoc, onSnapshot} from 'firebase/firestore'

import {firestore} from '../firebase';

const useStatistics = (userId) => {
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchUserDoc = async (userId) => {
        const q = doc(firestore, 'users', userId);

        const docSnap = await getDoc(q);

        if (docSnap.exists()) {
            const {totalItemsAdded} = docSnap.data();

            setTotalItems(totalItemsAdded)
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchUserDoc(userId);
    }, [userId]);

    return [totalItems, loading]
}

export {useStatistics}