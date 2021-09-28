import {useCallback, useEffect, useState} from 'react';
import {collection, where, query, addDoc, doc, deleteDoc, getDocs, getDoc, setDoc, onSnapshot} from 'firebase/firestore'

import {auth, firestore} from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

const useStatistics = (userId) => {
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchUserDoc = useCallback(async () => {
        const q = doc(firestore, 'users', userId);

        const docSnap = await getDoc(q);

        if (docSnap.exists()) {
            const {totalItemsAdded} = docSnap.data();

            setTotalItems(totalItemsAdded)
        }

        setLoading(false);
    }, [userId])

    useEffect(() => {
        fetchUserDoc();
    }, [userId, fetchUserDoc]);

    return [totalItems, loading]
}

const useSharing = (userId, email) => {
    const [invites, setInvites] = useState([]);
    const [pending, setPending] = useState([]);
    const [current, setCurrent] = useState([]);

    const [otherDocs, setOtherDocs] = useState([]);
    const [myDocs, setMyDocs] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(firestore, 'shares'), where('requestedEmail', '==', email));

        const unsub = onSnapshot(q, querySnap => {
            const fetched = [];
            querySnap.forEach(doc => {
                fetched.push({id: doc.id, ...doc.data()})
            });
            setOtherDocs(fetched)
        });

        return unsub;
    }, [userId, email])

    useEffect(() => {
        const q = query(collection(firestore, 'shares'), where('senderId', '==', userId));

        const unsub = onSnapshot(q, querySnap => {
            const fetched = [];
            querySnap.forEach(doc => {
                fetched.push({id: doc.id, ...doc.data()})
            });
            setMyDocs(fetched)
        });

        return unsub;
    }, [userId])

    useEffect(() => {
        const invites = otherDocs.filter(doc => !doc.requestedId);
        const pending = myDocs.filter(doc => !doc.requestedId);
        const current = otherDocs.filter(doc => doc.requestedId)
            .map(doc => ({email: doc.senderEmail, id: doc.id}))
            .concat(
                myDocs.filter(doc => doc.requestedId)
                    .map(doc => ({email: doc.requestedEmail, id: doc.id}))
            );

        setInvites(invites);
        setPending(pending);
        setCurrent(current)
        setLoading(false)

    }, [myDocs, otherDocs])

    return [invites, pending, current, loading]
}

const useRemoveShare = (userId) => {
    const [loading, setLoading] = useState(false);

    const removeShare = async (shareId) => {
        setLoading(true);
        await deleteDoc(doc(firestore, 'shares', shareId));
        setLoading(false);
    }

    return [removeShare, loading];
}

const useAcceptShare = (userId) => {
    const [loading, setLoading] = useState(false);

    const acceptShare = async (shareId) => {
        setLoading(true);

        const docRef = doc(firestore, 'shares', shareId)
        await setDoc(docRef, {requestedId: userId}, {merge: true});

        setLoading(false);
    }

    return [acceptShare, loading];
}

const yourInvitationDoesNotExist = async (userId, requestedEmail) => {
    const q = query(
        collection(firestore, 'shares'),
        where('senderId', '==', userId),
        where('requestedEmail', '==', requestedEmail),
    )

    const docSnaps = await getDocs(q);
    let exists = [];
    docSnaps.forEach(docSnap => {
        exists.push(docSnap.exists())
    })

    return exists.every(doc => !Boolean(doc))
}

const theirInvitationDoesNotExist = async (email, requestedEmail) => {
    const q = query(
        collection(firestore, 'shares'),
        where('requestedEmail', '==', email),
        where('senderEmail', '==', requestedEmail),
    )

    const docSnaps = await getDocs(q);
    let exists = [];
    docSnaps.forEach(docSnap => {
        exists.push(docSnap.exists())
    })

    return exists.every(doc => !Boolean(doc))
}

const useAddShare = () => {
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const {uid: userId, email, displayName} = user;

    const addShare = async (requestedEmail) => {
        setLoading(true);

        const conditions = await Promise.all([
            yourInvitationDoesNotExist(userId, requestedEmail),
            theirInvitationDoesNotExist(email, requestedEmail)
        ])

        if (conditions.every(Boolean)) {
            await addDoc(collection(firestore, 'shares'), {
                senderId: userId,
                senderEmail: email,
                senderName: displayName,
                requestedEmail
            })
        }

        setLoading(false);
    }

    return [addShare, loading];
}

export {useStatistics, useSharing, useRemoveShare, useAcceptShare, useAddShare}