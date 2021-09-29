import {query, collection, getDocs} from '@firebase/firestore';

import {firestore} from '../firebase';

const getDocumentsFromCollectionOnce = async (collectionName, where) => {
    const q = query(collection(firestore, collectionName), where);

    const docSnaps = await getDocs(q);

    const fetched = [];
    docSnaps.forEach(docSnap => {
        fetched.push({id: docSnap.id, ...docSnap.data()});
    });

    return fetched;
};

const getDocumentsFromQuerySnap = (docSnaps) => {
    const fetched = [];

    docSnaps.forEach(docSnap => {
        fetched.push({id: docSnap.id, ...docSnap.data()});
    });

    return fetched;
};

export {getDocumentsFromCollectionOnce, getDocumentsFromQuerySnap};