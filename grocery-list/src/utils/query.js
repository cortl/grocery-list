import {query, collection, getDocs} from "@firebase/firestore"

import {firestore} from "../firebase"

const getDocumentsFromCollectionOnce = async (collectionName, where) => {
    const q = query(collection(firestore, collectionName), where);

    const docSnaps = await getDocs(q);

    let fetched = [];
    docSnaps.forEach(docSnap => {
        fetched.push({id: docSnap.id, ...docSnap.data()})
    })

    return fetched;
}

const getDocumentsFromQuerySnap = (docSnaps) => {
    let fetched = [];

    docSnaps.forEach(docSnap => {
        fetched.push({id: docSnap.id, ...docSnap.data()})
    });

    return fetched;
}

export {getDocumentsFromCollectionOnce, getDocumentsFromQuerySnap}