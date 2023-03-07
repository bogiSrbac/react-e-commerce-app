import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';




const firebaseConfig = {
    apiKey: "AIzaSyAQLjlRio08XBTVf2JgMvuskE_NbPUgXEo",
    authDomain: "crwn-db-momir.firebaseapp.com",
    projectId: "crwn-db-momir",
    storageBucket: "crwn-db-momir.appspot.com",
    messagingSenderId: "677426423782",
    appId: "1:677426423782:web:dfe0ee22bbaa26b7a0d827"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;

};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithEmailAndPasswordAuth = async (email, password) =>{
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password)

}

