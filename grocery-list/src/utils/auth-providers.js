import {signInWithPopup, GoogleAuthProvider} from "@firebase/auth";
import {auth} from "../firebase";


const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error(error);
    }
}

const signOut = async () => {
    await auth.signOut();
}

export {signInWithGoogle, signOut}