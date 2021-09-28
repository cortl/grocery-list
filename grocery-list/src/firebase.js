import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_DEV,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
    databaseURL: process.env.REACT_APP_DATABASE_URL_DEV,
    projectId: process.env.REACT_APP_PROJECT_ID_DEV,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
    appId: process.env.REACT_APP_APP_ID_DEV
};


const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore();
const auth = getAuth();

export {firebase, firestore, auth}