import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;

}




