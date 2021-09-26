import {signInWithPopup, GoogleAuthProvider} from "@firebase/auth";
import {auth} from "../firebase";


const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, googleProvider);

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export {signInWithGoogle}